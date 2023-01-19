import { GlobalToken } from "antd/es/theme/interface"
import { useCallback } from "react"
import { IReactionMaterial } from "runner/reaction/interfaces/material"
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas"
import { useTrans } from "./useTrans"

export function useGetSingleNodeConfig() {
  const t = useTrans()
  const getSingleNodeConfig = useCallback((nodeMeta: IReactionNodeMeta, token: GlobalToken, material: IReactionMaterial | undefined) => {
    const ports = nodeMeta.ports?.map(
      port => ({
        id: port.name,
        name: port.name,
        group: port.group,
        attrs: {
          text: {
            text: t(port.label),
            fill: token.colorTextSecondary,
            fontSize: 12,
          },
        },
        label: {
          position: {
            // 标签位置
            name: port.group === 'out' ? 'right' : 'in', // 标签位置计算方法的名称,
          }
        }
      })
    )
    return {
      shape: "reaction-node",
      x: 340,
      y: 240,
      width: 80,
      height: 40,
      data: {
        nodeMeta,
        backgroundColor: token.colorBgContainer,
        color: token.colorTextSecondary,
        material,
        token
      },
      ports: {
        groups: {
          in: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: token.colorTextSecondary,
                strokeWidth: 1,
                fill: token.colorBorderSecondary,
              },
            },

          },
          out: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: token.colorTextSecondary,
                strokeWidth: 1,
                fill: token.colorBorderSecondary,
              },
            },
          },
        },
        items: ports
      },
    }
  }, [t])

  return getSingleNodeConfig
}
