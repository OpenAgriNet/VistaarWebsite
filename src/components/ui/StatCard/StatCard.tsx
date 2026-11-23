import * as S from './StatCard.styles';

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <S.Root>
      <S.Value>{value}</S.Value>
      <S.Label>{label}</S.Label>
    </S.Root>
  );
}
