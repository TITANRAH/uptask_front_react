interface Props {
  children: React.ReactNode;
}
//TODO: REACT HOOK FORM 2 ALERTA DE ERRORES
function ErrorMessage(props: Props) {
  const { children } = props;
  return (
    <div className="text-center my-4 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
}

export default ErrorMessage;
