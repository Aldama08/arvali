import React, { useState } from 'react'
import styles from './Forms.module.css'
import { createClient} from '@supabase/supabase-js'


const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_KEY;

const supabase = createClient(url, key);


const Forms = () => {

   const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  });

  const manejoCambio = (evento) =>{
    setFormData({
      ...formData,
      [evento.target.name]: evento.target.value
    })
  }

  const Enviar = async (evento) => {
    evento.preventDefault();

    const {data, error} = await supabase
    .from('cliente')
    .insert([
      {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        telefono: formData.telefono
      }
    ]);

    if(error){
      alert('Error al insertar' + error.message)
    }else{
      alert('Datos enviados!')
    }

  };
  

  return (
    <form onSubmit={Enviar}>
      <label>Nombre</label>
      <input type='text' name='nombre' value={formData.nombre} onChange={manejoCambio}/>
      <hr />
      <label>Apellido</label>
      <input type='text' name='apellido' value={formData.apellido} onChange={manejoCambio}/>
      <hr />
      <label>Correo</label>
      <input type='text' name='correo' value={formData.correo} onChange={manejoCambio}/>
      <hr />
      <label>Telefono</label>
      <input type='text' name='telefono' value={formData.telefono} onChange={manejoCambio}/>
      <hr />
      <button type='submit'>enviar</button>
    </form>
  )
}

export default Forms