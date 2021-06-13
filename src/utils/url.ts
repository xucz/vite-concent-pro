
export function purify(url: string) {
  const [pureUrl] = url.split('?');
  return pureUrl;
}
