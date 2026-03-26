import { ChangeEvent, JSX, useMemo } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";

import {
  CheckboxFieldConfig,
  FieldType,
  RadioFieldConfig,
  SelectFieldConfig,
  TextareaFieldConfig,
  ListFieldConfig,
  FileFieldConfig,
} from "../../types";
import { validators } from "../../validators";

import { DynamicFieldProps } from "./types";

import { useFormData, useFormErrors, useFormStore } from "@/lib/store/form";
import FileImageUploader from "@/components/fileUpload/filepond-image-uploader";

function DynamicField(props: DynamicFieldProps): JSX.Element | null {
  const { field } = props;

  const formData = useFormData();
  const errors = useFormErrors();
  const handleChange = useFormStore((state) => state.handleChange);
  const handleBlur = useFormStore((state) => state.handleBlur);

  const value = formData[field.name];
  const error = errors[field.name];

  const fieldComponent = useMemo((): JSX.Element | null => {
    if (field.condition && !field.condition(formData)) return null;

    const commonProps = {
      name: field.name,
      value: field.type === FieldType.CHECKBOX ? undefined : value,
      checked: field.type === FieldType.CHECKBOX ? value : undefined,
      onChange: (
        e: ChangeEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLSelectElement
          | HTMLInputElement
        >,
      ) => {
        const newValue =
          field.type === FieldType.CHECKBOX
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        field?.handleChange && field.handleChange(newValue, formData);
        handleChange(field.name, newValue);
      },
      onBlur: () => handleBlur(field.name),
      disabled: field.disabled,
      placeholder: field.placeholder,
      className: field.className,
    };

    switch (field.type) {
      case FieldType.TEXTAREA:
        const textareaField = field as TextareaFieldConfig;

        return <textarea {...commonProps} rows={textareaField.rows || 4} />;

      case FieldType.SELECT:
        const selectField = field as SelectFieldConfig;

        return (
          <select
            {...commonProps}
            className={`${commonProps.className} bg-white`}
          >
            {selectField.placeholder && (
              <option value="">{selectField.placeholder}</option>
            )}
            {selectField.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case FieldType.RADIO:
        const radioField = field as RadioFieldConfig;

        return (
          <div className="space-y-2">
            {radioField.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  checked={value === option.value}
                  className="w-4 h-4 text-blue-600"
                  disabled={field.disabled}
                  name={field.name}
                  type="radio"
                  value={option.value}
                  onBlur={() => handleBlur(field.name)}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    field?.handleChange &&
                      field.handleChange(newValue, formData);
                    handleChange(field.name, newValue);
                  }}
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case FieldType.CHECKBOX:
        const checkboxField = field as CheckboxFieldConfig;

        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...commonProps}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              {checkboxField.checkboxLabel || field.label}
            </span>
          </label>
        );

      case FieldType.FILE:
        const fileField = field as FileFieldConfig;

        return (
          <div>
            <label className="text-foreground text-small">{field.label}</label>
            <div className="mt-2">
              <FileImageUploader
                acceptedFileTypes={fileField.accept}
                className={commonProps.className}
                defaultFiles={value}
                disabled={field.disabled}
                name={field.name}
                onprocessfile={(error, fileItem) => {
                  if (error) return;

                  handleChange(field.name, [{ source: fileItem.serverId }]);
                }}
              />
            </div>
          </div>
        );

      case FieldType.LIST:
        const listField = field as ListFieldConfig;

        return (
          <Listbox
            aria-label={field.label}
            bottomContent={
              error && (
                <span className="text-xs text-danger-500 mt-1 font-normal">
                  {error}
                </span>
              )
            }
            items={listField.options}
            selectedKeys={commonProps.value}
            selectionMode={listField.selection}
            variant="faded"
            onSelectionChange={(e) => {
              const newValue = Array.from(e);

              field?.handleChange && field.handleChange(newValue, formData);
              handleChange(field.name, newValue);
            }}
          >
            {(item) => (
              <ListboxItem
                key={item.value}
                showDivider
                classNames={{
                  selectedIcon: "[&_polyline]:stroke-primary-500 w-5 h-5",
                }}
                startContent={
                  item?.image && (
                    <Image
                      alt={item.title}
                      height={50}
                      radius="sm"
                      src={item.image}
                      width={50}
                    />
                  )
                }
                textValue={item.title}
              >
                <p className="text-base">{item.title}</p>
              </ListboxItem>
            )}
          </Listbox>
        );

      case FieldType.NUMBER:
        return (
          <NumberInput
            hideStepper
            classNames={{
              inputWrapper:
                "border-gray-300 data-[hover=true]:border-gray-200 group-data-[focus=true]:border-gray-300",
            }}
            description={field.description}
            errorMessage={error}
            isInvalid={!!error}
            isRequired={field.validations?.some(
              (v) => v === validators.required,
            )}
            label={field.label}
            labelPlacement="outside"
            maxValue={100}
            minValue={0}
            type={field.type}
            value={value}
            variant="bordered"
            onBlur={commonProps.onBlur}
            onValueChange={(value) => {
              field?.handleChange && field.handleChange(value, formData);
              handleChange(field.name, value);
            }}
          />
        );

      default:
        return (
          <Input
            classNames={{
              inputWrapper:
                "border-gray-300 data-[hover=true]:border-gray-200 group-data-[focus=true]:border-gray-300",
            }}
            description={field.description}
            errorMessage={error}
            isInvalid={!!error}
            isRequired={field.validations?.some(
              (v) => v === validators.required,
            )}
            label={field.label}
            labelPlacement="outside-top"
            type={field.type}
            variant="bordered"
            {...commonProps}
          />
        );
    }
  }, [field, formData, errors, handleChange, handleBlur, value, error]);

  return fieldComponent;
}

export default DynamicField;
