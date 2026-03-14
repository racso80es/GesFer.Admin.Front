import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverPostJson } from "@/lib/api/server-fetch";

/**
 * En desarrollo, HTTPS a localhost falla por certificado autofirmado.
 * El backend expone http://localhost:5010 (perfil https: 5011+5010).
 * Usar HTTP 5010 para evitar rechazo de Node.
 */
function loginApiBaseUrl(): string {
  const configured = (process.env.ADMIN_API_URL || "https://localhost:5011").replace(/\/+$/, "");
  try {
    const u = new URL(configured);
    if (u.protocol === "https:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1")) {
      return `http://${u.hostname}:5010`;
    }
  } catch {
    /* ignore */
  }
  return configured;
}

/**
 * Configuración de autenticación para GesFer Admin
 * Utiliza CredentialsProvider para autenticar contra la API Admin de ASP.NET Core.
 * En desarrollo usa serverPostJson y HTTP 5010 para evitar certificado autofirmado.
 */
export const authConfig: NextAuthConfig = {
  providers: [
    // Provider para usuarios administrativos
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const baseUrl = loginApiBaseUrl();
          const apiBase = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
          const loginUrl = `${apiBase}/admin/auth/login`;

          const { ok, status, data, errorText } = await serverPostJson<{
            userId?: string;
            cursorId?: string;
            username?: string;
            firstName?: string;
            lastName?: string;
            email?: string | null;
            role?: string;
            token?: string;
          }>(loginUrl, {
            Usuario: credentials.username,
            Contraseña: credentials.password,
          });

          if (!ok || !data) {
            console.error("Login failed:", status, errorText);
            return null;
          }

          return {
            id: data.cursorId ?? "",
            cursorId: data.cursorId ?? "",
            userId: data.userId ?? "",
            username: data.username ?? "",
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            email: data.email ?? undefined,
            role: data.role ?? "Admin",
            accessToken: data.token ?? "",
          };
        } catch (error) {
          console.error("Error en authorize (admin):", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.cursorId = user.cursorId as string;
        token.userId = user.userId as string;
        token.username = user.username as string;
        token.firstName = user.firstName as string;
        token.lastName = user.lastName as string;
        token.role = user.role as string;
        token.email = user.email as string;
        token.accessToken = user.accessToken as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.cursorId = token.cursorId as string;
        session.user.userId = token.userId as string;
        session.user.username = token.username as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: process.env.AUTH_SECRET || "your-secret-key-change-in-production",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
