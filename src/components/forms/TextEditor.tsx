/* eslint-disable react/jsx-no-undef */
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';

//#region  //*=========== Dynamic Import Quill ===========
const ReactQuillComponent = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading</p>,
});
//#endregion  //*======== Dynamic Import Quill ===========

//#region  //*=========== Options ===========
const modules = {
  toolbar: [
    [{ size: [] }, { header: '1' }, { header: '2' }, 'blockquote'],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: true,
  },
};

const formats = [
  'size',
  'header',
  'blockquote',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
//#endregion  //*======== Options ===========

type TextEditorProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Required validation only */
  validation?: RegisterOptions;
  /** className for div container */
  containerClassName?: string;
};
export default function TextEditor({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  containerClassName,
}: TextEditorProps) {
  const [focus, setFocus] = React.useState<boolean>(false);

  //#region  //*=========== Form ===========
  const {
    formState: { errors },
    setError,
    setValue,
    control,
    clearErrors,
  } = useFormContext();
  //#endregion  //*======== Form ===========

  //#region  //*=========== Callback ===========
  const onEditorBlur = (editor: ReactQuill.UnprivilegedEditor) => {
    setFocus(false);
    onEditorChange(editor);
  };

  const onEditorFocus = () => {
    setFocus(true);
  };

  /**
   * React Quill leaves <p><br></p> even when content is empty,
   * this function is to manually clear the input
   * https://github.com/quilljs/quill/issues/1328
   */
  const onEditorChange = (editor: ReactQuill.UnprivilegedEditor) => {
    if (validation?.required && editor.getText().length - 1 <= 0) {
      setError(id, {
        type: 'required',
        message: validation?.required as string,
      });
      setValue(id, '');
      return;
    }

    clearErrors(id);
  };
  //#endregion  //*======== Callback ===========

  return (
    <div className={containerClassName}>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <Controller
        control={control}
        rules={validation}
        defaultValue=''
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div
              className={clsx(
                label !== '' && 'mt-1',
                'relative w-full bg-white rounded-md border ring-1 shadow-sm',
                readOnly
                  ? 'bg-gray-100 ring-0 border-gray-300 '
                  : errors[id]
                  ? [
                      focus
                        ? 'ring-red-500 border-red-500'
                        : 'border-red-500 ring-transparent',
                    ]
                  : [
                      focus
                        ? 'ring-primary-500 border-primary-500'
                        : 'border-gray-300 ring-transparent',
                    ]
              )}
            >
              <ReactQuillComponent
                value={value}
                theme='snow'
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={(content, _delta, _source, editor) => {
                  onChange(content);
                  onEditorChange(editor);
                }}
                onBlur={(_previousRange, _source, editor) => {
                  onBlur();
                  onEditorBlur(editor);
                }}
                onFocus={onEditorFocus}
                modules={readOnly ? { toolbar: false } : modules}
                formats={formats}
              />
            </div>
            {(helperText || !hideError) && (
              <div className='mt-1'>
                {helperText && (
                  <p className='text-xs text-gray-500'>{helperText}</p>
                )}
                {!hideError && errors[id] && (
                  <span className='text-sm text-red-500'>
                    {errors[id].message}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
