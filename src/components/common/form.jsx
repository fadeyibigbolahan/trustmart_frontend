import { useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      formControls.forEach((control) => {
        if (control.componentType === "image") {
          (formData[control.name] || []).forEach((file) => {
            if (typeof file !== "string") {
              URL.revokeObjectURL(file.preview);
            }
          });
        }
      });
    };
  }, [formControls, formData]);

  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <div className="relative">
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className={getControlItem.endIcon ? "pr-10" : ""}
            />
            {getControlItem.endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getControlItem.endIcon}
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <Select
            onValueChange={(val) =>
              setFormData({ ...formData, [getControlItem.name]: val })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      case "image":
        return (
          <div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files).map((file) => {
                  file.preview = URL.createObjectURL(file);
                  return file;
                });

                setFormData((prev) => ({
                  ...prev,
                  [getControlItem.name]: [
                    ...(prev[getControlItem.name] || []).filter(
                      (f) => typeof f === "string"
                    ),
                    ...files,
                  ],
                }));
              }}
            />

            <div className="flex flex-wrap gap-3 mt-3">
              {(formData[getControlItem.name] || []).map((file, index) => {
                const isString = typeof file === "string";
                const url = isString ? file : file.preview;

                return (
                  <div key={index} className="relative w-20 h-20 group">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                    {!isString && (
                      <div className="absolute bottom-[-20px] left-0 w-32 text-[10px] truncate text-center">
                        {file.name} ({Math.round(file.size / 1024)} KB)
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedImages = [
                          ...formData[getControlItem.name],
                        ];
                        if (!isString) {
                          URL.revokeObjectURL(file.preview);
                        }
                        updatedImages.splice(index, 1);
                        setFormData({
                          ...formData,
                          [getControlItem.name]: updatedImages,
                        });
                      }}
                      className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <div className="relative">
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
              className={getControlItem.endIcon ? "pr-10" : ""}
            />
            {getControlItem.endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getControlItem.endIcon}
              </div>
            )}
          </div>
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
