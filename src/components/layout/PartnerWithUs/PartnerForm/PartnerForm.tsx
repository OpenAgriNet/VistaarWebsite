'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import * as S from './PartnerForm.styles';
import { DbimChevronDown, DbimClose } from '@/components/ui/Icon/dbim';

export interface PartnerInquiry {
  fullName: string;
  organisation: string;
  email: string;
  state: string;
  interest: string;
  description: string;
}

type FieldName = keyof PartnerInquiry;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: PartnerInquiry = {
  fullName: '',
  organisation: '',
  email: '',
  state: '',
  interest: '',
  description: '',
};
const REQUIRED: FieldName[] = ['fullName', 'organisation', 'email'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PICTURE_SRC = '/images/partner/partner-side.webp';

interface PartnerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: (inquiry: PartnerInquiry) => void;
}

/**
 * "Partner With Us" inquiry form (Figma "Inquiry form"). Validates on submit: full name,
 * organisation and email are required, email must look valid; errors are shown under the
 * fields and focus moves to the first one.
 * TODO(api): post the inquiry to the backend; today `onSubmitted` just shows the success message.
 * TODO(content): "Partnership interest" options are not in the Figma.
 */
export function PartnerForm({ open, onClose, onSubmitted }: PartnerFormProps) {
  const t = useTranslations('partner');
  const states = t.raw('states') as string[];
  const interests = t.raw('interests') as string[];
  const [values, setValues] = useState<PartnerInquiry>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = useId();
  const titleId = `${idPrefix}-title`;
  const fieldId = (name: FieldName) => `${idPrefix}-${name}`;
  const errorId = (name: FieldName) => `${idPrefix}-${name}-error`;

  const update = (name: FieldName) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = (data: PartnerInquiry): Errors => {
    const found: Errors = {};
    for (const name of REQUIRED) {
      if (!data[name].trim()) found[name] = t('errors.required');
    }
    if (!found.email && !EMAIL_PATTERN.test(data.email.trim())) found.email = t('errors.email');
    return found;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = REQUIRED.find((name) => found[name]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)?.focus();
      return;
    }
    onSubmitted(values);
    setValues(EMPTY);
  };

  /** Props shared by every control: id, value, change handler and error wiring. */
  const control = (name: FieldName) => ({
    id: fieldId(name),
    name,
    value: values[name],
    onChange: update(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? errorId(name) : undefined,
  });

  const label = (name: FieldName) => (
    <S.Label htmlFor={fieldId(name)}>
      {t(`fields.${name}.label`)}
      {REQUIRED.includes(name) && (
        <S.Required>
          <span aria-hidden>*</span>
          <span className="sr-only">({t('requiredHint')})</span>
        </S.Required>
      )}
    </S.Label>
  );

  const error = (name: FieldName) =>
    errors[name] && <S.FieldError id={errorId(name)}>{errors[name]}</S.FieldError>;

  return (
    <S.Root open={open} onClose={onClose} aria-labelledby={titleId}>
      <S.Picture src={PICTURE_SRC} alt="" />
      <S.Body>
        <S.CloseButton type="button" onClick={onClose} aria-label={t('close')}>
          <Icon icon={DbimClose} size="sm" tone="inherit" />
        </S.CloseButton>

        <S.Header>
          <S.Title id={titleId}>{t('title')}</S.Title>
          <S.Subtitle>{t('subtitle')}</S.Subtitle>
        </S.Header>

        <S.Form ref={formRef} onSubmit={handleSubmit} noValidate>
          <S.Field>
            {label('fullName')}
            <S.Input
              {...control('fullName')}
              placeholder={t('fields.fullName.placeholder')}
              autoComplete="name"
            />
            {error('fullName')}
          </S.Field>
          <S.Field>
            {label('organisation')}
            <S.Input
              {...control('organisation')}
              placeholder={t('fields.organisation.placeholder')}
              autoComplete="organization"
            />
            {error('organisation')}
          </S.Field>
          <S.Field>
            {label('email')}
            <S.Input
              {...control('email')}
              type="email"
              placeholder={t('fields.email.placeholder')}
              autoComplete="email"
            />
            {error('email')}
          </S.Field>
          <S.Field>
            {label('state')}
            <S.SelectWrap>
              <S.Select {...control('state')} data-empty={!values.state}>
                <option value="" disabled>
                  {t('fields.state.placeholder')}
                </option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </S.Select>
              <Icon icon={DbimChevronDown} size="sm" tone="inherit" />
            </S.SelectWrap>
          </S.Field>
          <S.Field>
            {label('interest')}
            <S.SelectWrap>
              <S.Select {...control('interest')} data-empty={!values.interest}>
                <option value="" disabled>
                  {t('fields.interest.placeholder')}
                </option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </S.Select>
              <Icon icon={DbimChevronDown} size="sm" tone="inherit" />
            </S.SelectWrap>
          </S.Field>
          <S.Field>
            {label('description')}
            <S.TextArea
              {...control('description')}
              placeholder={t('fields.description.placeholder')}
            />
          </S.Field>
          <S.Submit type="submit">{t('submit')}</S.Submit>
        </S.Form>
      </S.Body>
    </S.Root>
  );
}
