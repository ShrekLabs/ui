import { RadioButton, RadioGroup } from "@gravity-ui/uikit";
import { memo } from "react";
import { useFn } from "../../../../react/hooks";
import { TSettingsEnumItem } from "../../Setting/definitions";

const UNDEFINED = "__VALUE_SUPPOSED_TO_BE_UNDEFINED__";

type TProps = { setting: TSettingsEnumItem };

export const EnumSetting = memo(function EnumSetting({ setting }: TProps) {
  const currentValue = setting.value.read() ?? UNDEFINED;

  const submit = useFn((submitted: string | typeof UNDEFINED) => {
    if (submitted === UNDEFINED) {
      setting.value.write(undefined);
    } else {
      setting.value.write(submitted);
    }
  });

  if (setting.widgetType === "radio-button") {
    return (
      <RadioButton value={currentValue} onUpdate={submit}>
        {setting.values.map(({ value, label }) => (
          // @gravity-ui/uikit's RadioButton.Option doesn't support undefined as value (sadly)
          <RadioButton.Option value={value ?? UNDEFINED} key={value ?? UNDEFINED}>
            {label}
          </RadioButton.Option>
        ))}
      </RadioButton>
    );
  } else {
    return (
      <RadioGroup value={currentValue} onUpdate={submit} direction={"vertical"}>
        {setting.values.map(({ value, label }) => (
          // @gravity-ui/uikit's RadioButton.Option doesn't support undefined as value (sadly)
          <RadioGroup.Option value={value ?? UNDEFINED} key={value ?? UNDEFINED}>
            {label}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    );
  }
});
