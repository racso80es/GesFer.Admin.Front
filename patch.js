const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<<<<<<< HEAD[\s\S]*?=======\s*console\.error\(error\);\s*set.*?\((.*?)\);\s*>>>>>>> origin\/main/g, (match, p1) => {
    return `const message = error instanceof Error ? error.message : String(error);\n      console.error("Error:", message);\n      setError(message);`;
  });
  content = content.replace(/setError/g, file.includes('edit') ? 'setSubmitError' : 'setError');
  fs.writeFileSync(file, content);
}

fix('src/app/companies/[id]/edit/page.tsx');
fix('src/app/companies/new/page.tsx');
