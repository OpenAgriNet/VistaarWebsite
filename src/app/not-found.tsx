import * as S from './not-found.styles';

/** Exported as out/404.html — set it as the S3 error document. */
export default function NotFound() {
  return (
    <S.Root className="container">
      <S.Title>Page not found</S.Title>
      <S.Link href="/">Go to the home page</S.Link>
    </S.Root>
  );
}
