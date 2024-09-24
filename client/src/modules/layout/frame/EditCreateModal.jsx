import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import Modal from './Modal';  // Importamos el Modal ya existente
import { zodValidator } from '@tanstack/zod-form-adapter';

const EditCreateModal = ({ isOpen, onClose, title, data, fields, onSubmit }) => {

  // Generar dinámicamente el esquema de validación basado en los campos
  const dynamicSchema = z.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {})
  );

  // Configuración de Tanstack Form
  const form = useForm({
    defaultValues: data,
    validatorAdapter: zodValidator(dynamicSchema),
    validators: { onChange: dynamicSchema },
    onSubmit: ({ value }) => {
      onSubmit(value);  // Pasar el valor al callback onSubmit
      onClose();
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
        {fields.map((fieldUnit) => (
          fieldUnit.noEditable ? null :
            <form.Field key={fieldUnit.name} name={fieldUnit.name}>
              {({ field }) => (
                <div className="my-3">
                  <label htmlFor={field.name} className="block mb-2">
                    {fieldUnit.icon && <fieldUnit.icon className="inline-block mr-2" />}
                    {fieldUnit.label}:
                  </label>
                  {fieldUnit.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      className="w-full border p-2 rounded mb-1"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={fieldUnit.type || 'text'}
                      value={field.state.value}
                      className="w-full border p-2 rounded mb-1"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </div>
              )}
            </form.Field>
        ))}
        <form.Subscribe selector={(state) => state.errors}>
          {(errors) => errors.length > 0 && <p className="text-red-500 text-sm my-3">{errors}</p>}
        </form.Subscribe>
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
          <button
            type="reset"
            onClick={() => form.reset()}
            className="text-indigo-600 hover:underline"
          >
            Restablecer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCreateModal;
