export default function FormError({ validation, name }) {
  const { id, error } = validation.errorProps(name);
  return (
    <span className="form-validation__error" id={id} aria-live="polite" hidden={!error}>
      {error}
    </span>
  );
}
