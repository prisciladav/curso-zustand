import React, { useEffect, useState } from 'react'
import { tesloApi } from '../../../api/teslo.api';

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown | null>(null);

  useEffect(() => {
    tesloApi.get('/auth/private')
        .then( resp => setInfo(resp.data))
        .catch(() => setInfo({ message: 'Error en la solicitud' }));
  }, [])

  return (
    <React.Fragment>
        <h2 className="text-2xl font-bold mb-4">Información</h2>
        <pre>
            {JSON.stringify(info, null, 2)}
        </pre>
    </React.Fragment>
  )
}
