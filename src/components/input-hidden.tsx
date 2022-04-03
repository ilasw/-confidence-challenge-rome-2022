import React, {FC} from "react";

export const InputHidden: FC<{ label: string }> = ({label, children}) => {
  return <label className={'editable-field'}>
    {children}
    <span>{label}</span>
  </label>;
}

export default InputHidden;