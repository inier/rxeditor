import { Button, Input, InputNumber, Switch } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { isBool, isNum, isStr } from "core/utils/types";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1;

  .ant-input-number {
    width: auto;
  }

  .input-button {
    min-width: 96px;
    margin-left: 2px;
  }
`

const InputCol = styled.div`
  flex: 1;
`

export enum ValueType {
  Boolean = "boolean",
  Number = "number",
  String = "string"
}

const types = [
  ValueType.String,
  ValueType.Number,
  ValueType.Boolean,
]

function getValueType(value?: any) {
  if (isStr(value)) {
    return ValueType.String
  }
  if (isBool(value)) {
    return ValueType.Boolean
  }
  if (isNum(value)) {
    return ValueType.Number
  }
  return ValueType.String
}

export const ValueInput = memo((
  props: {
    value?: any,
    onChange?: (value?: any) => void
  }
) => {
  const { value, onChange } = props
  const [typeIndex, setTypeIndex] = useState(types.indexOf(getValueType(value)))
  const t = useToolsTranslate()

  useEffect(() => {
    setTypeIndex(types.indexOf(getValueType(value)))
  }, [value])

  const handleClick = useCallback(() => {
    let newIndex = typeIndex + 1

    if (newIndex >= types.length) {
      newIndex = 0
    }
    setTypeIndex(newIndex)
    if (types[newIndex] === ValueType.String) {
      onChange?.(value?.toString())
    } else if (types[newIndex] === ValueType.Boolean) {
      onChange?.(!!value)
    } else if (types[newIndex] === ValueType.Number) {
      onChange?.(0)
    }
  }, [onChange, typeIndex, value])

  const handleStringChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target?.value)
  }, [onChange])

  const handleNumberChange = useCallback((newValue?: number | null) => {
    onChange?.(newValue || undefined)
  }, [onChange])

  const handleBooleanChange = useCallback((checked: boolean) => {
    onChange?.(checked)
  }, [onChange])

  return (<Container>
    <InputCol>
      {
        types[typeIndex] === ValueType.String &&
        <Input value={value} onChange={handleStringChange} />
      }
      {
        types[typeIndex] === ValueType.Number &&
        <InputNumber value={value as number | undefined} onChange={handleNumberChange} />
      }
      {
        types[typeIndex] === ValueType.Boolean &&
        <Switch checked={value} onChange={handleBooleanChange} />
      }
    </InputCol>
    <Button
      className='input-button'
      onClick={handleClick}>
      {t(types[typeIndex])}
    </Button>
  </Container>)
})