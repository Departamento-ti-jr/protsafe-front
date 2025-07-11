import { FormularioDocumento } from "../../formulario-documento"

export default function DocumentoEditarPage({ params }: { params: { id: string } }) {
  return <FormularioDocumento id={params.id} />
}
