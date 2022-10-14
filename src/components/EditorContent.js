import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'

import EditorContentBlockSecao from '@/components/EditorContentBlockSecao'

import Log from '@/utils/Log'

import contentBlocks from '@/contentBlocks'

import {
  DND_EDITOR_SIDEBAR_BLOCK_SECAO,
  DND_EDITOR_SIDEBAR_BLOCK_TITULO,
  DND_EDITOR_SIDEBAR_BLOCK_TEXTO,
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES,
  DND_EDITOR_SIDEBAR_BLOCK_BOTAO,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER,
  DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS
} from '@/dndTypes'

export default function EditorContent(props) {
  const [blocks, setBlocks] = useState([])

  const [{ item, itemType, didDrop }, drop] = useDrop(
    () => ({
      accept: DND_EDITOR_SIDEBAR_BLOCK_SECAO,

      collect(monitor) {
        return {
          item: monitor.getItem(),
          itemType: monitor.getItemType(),
          didDrop: monitor.didDrop(),
        }
      },

      drop(item, monitor) {
        const itemType = monitor.getItemType()
        const ContentBlock = contentBlocks[itemType]

        setBlocks((blocks) => ([
          ...blocks,
          { order: null, Block: ContentBlock }
        ]))
      }
    }), []
  )

  useEffect(() => {
    if (didDrop) {
    }
  }, [didDrop])

  useEffect(() => {
    Log.dev('EditorContent', blocks)
  }, [blocks])

  function renderBlocks() {
    return blocks.map((block, i) => {
      const { Block } = block

      return (<Block key={i}/>)
    })
  }

  return (
    <div className="editor-content" ref={drop}>
      {renderBlocks()}
    </div>
  )
}

