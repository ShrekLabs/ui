import { TextArea, TextInput } from "@gravity-ui/uikit";
import { memo, useEffect, useState } from "react";
import { useFn } from "../../../../react/hooks";
import { TSettingsStringItem } from "../../Setting/definitions";

type TProps = { setting: TSettingsStringItem };

export const StringSetting = memo(function StringSetting({ setting }: TProps) {
  const settingValue = setting.value.read();

  const [value, setValue] = useState(settingValue ?? "");
  useEffect(() => setValue(settingValue ?? ""), [settingValue]);

  const onUpdate = useFn((updated: string) => setValue(updated));
  const submit = useFn(() => setting.value.write(value));

  return setting.multiline ? (
    <TextArea value={value} onUpdate={onUpdate} onBlur={submit} maxRows={setting.multiline.maxRows}></TextArea>
  ) : (
    <TextInput value={value} onUpdate={onUpdate} onBlur={submit}></TextInput>
  );
});
