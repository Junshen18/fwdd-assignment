export function encrypt(text: string, shift: number): string {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const shiftedCode =
          ((code - (isUpperCase ? 65 : 97) + shift) % 26) +
          (isUpperCase ? 65 : 97);
        return String.fromCharCode(shiftedCode);
      }
      return char;
    })
    .join("");
}

export function decrypt(text: string, shift: number): string {
  return encrypt(text, 26 - shift);
}
