import { cn } from '@/lib/utils/cn';

describe('cn utility', () => {
  it('merges simple classes', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('handles conditionals', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });

  it('resolves tailwind conflicts using twMerge', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('ignores null and undefined values', () => {
    expect(cn('a', null, undefined, 'b')).toBe('a b');
  });

  it('handles arrays and objects', () => {
    expect(cn(['a', 'b'], { 'c': true, 'd': false })).toBe('a b c');
  });
});
