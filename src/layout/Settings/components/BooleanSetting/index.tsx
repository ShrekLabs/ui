import { Switch } from "@gravity-ui/uikit";
import { memo } from "react";
import { useFn } from "../../../../react/hooks";
import { TSettingsBooleanItem } from "../../Setting/definitions";

type TProps = { setting: TSettingsBooleanItem };

export const BooleanSetting = memo(function BooleanSetting(props: TProps) {
  const onUpdate = useFn((updated: boolean) => props.setting.value.write(updated));

  return <Switch checked={props.setting.value.read() ?? false} onUpdate={onUpdate} />;
});
