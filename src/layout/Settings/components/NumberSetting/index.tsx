import { TextInput } from "@gravity-ui/uikit";
import { notEmpty, stringToNumberOrUndefined } from "@shreklabs/core";
import { memo, useEffect, useState } from "react";
import { useFn } from "../../../../react/hooks";
import { TSettingsNumberItem } from "../../Setting/definitions";

type TProps = { setting: TSettingsNumberItem };

export const NumberSetting = memo(function NumberSetting({ setting }: TProps) {
  const settingValue = setting.value.read();

  const [value, setValue] = useState(settingValue ? String(settingValue) : "");
  useEffect(() => setValue(notEmpty(settingValue) ? String(settingValue) : ""), [settingValue]);

  const submit = useFn(() => {
    const asNumber = stringToNumberOrUndefined(value);
    if (asNumber === undefined) {
      setValue(String(settingValue));
    } else {
      setting.value.write(asNumber);
    }
  });

  return <TextInput value={value} onUpdate={setValue} onBlur={submit}></TextInput>;
});
