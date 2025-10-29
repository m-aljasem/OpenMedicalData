import md5 from "md5";

export function getGravatarUrl(email: string, size: number = 200): string {
  const hash = md5(email.toLowerCase().trim());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

export function getPremadeAvatarUrl(avatarValue: string): string {
  // You can host premade avatars or use a service
  // For now, returning a placeholder
  return `/avatars/${avatarValue}.png`;
}

