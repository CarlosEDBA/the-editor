import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES } from '@/dndTypes'

export default function EditorContentBlockListaIcones(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)
  
  const [content, setContent] = useState([
    { icon: '', text: '' }
  ])

  const dispatch = useDispatch()

  const fileInputs = useRef([])

  useEffect(() => {
    if (blockTree[id]) {
      let content = blockTree[id]['content']
      setContent(content)
    } else {
      dispatch(addBlock(id, {
        type: DND_TYPE,
        parentId: parentId,
        content: content
      }))
    }
  }, [])

  function handleAddItemClick(event) {
    setContent((content) => {
      let newContent = [
        ...content,
        { icon: '', text: '' }
      ]

      dispatch(updateBlock(id, {
        content: newContent
      }))

      return newContent
    })
  }

  function handleItemTextChange(event, index) {
    const target = event.currentTarget
        
    setContent((content) => {
      let newContent = content.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            text: target.value
          }
        } 
        
        return item       
      })

      dispatch(updateBlock(id, {
        content: newContent
      }))

      return newContent
    })
  }

  function handleItemIconChange(event, index) {
    const input = fileInputs.current[index]
    const files = input.files
    const file = files[0]

    const reader = new FileReader()
    
    reader.onload = (event) => {
      let icon = event.target.result

      setContent((content) => {
        let newContent = content.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              icon: icon
            }
          } 
          
          return item       
        })

        dispatch(updateBlock(id, {
          content: newContent
        }))

        return newContent
      })
    }

    reader.readAsBinaryString(file)
  }

  function renderItems() {
    return content.map((item, i) => {
      return (
        <div className="editor-content-block-lista-icones-item" key={i}>
          <div className="editor-content-block-lista-icones-item__icon">
            <input className="editor-content-block-lista-icones-item__icon-input" type="file" accept="image/svg+xml" onChange={(event) => handleItemIconChange(event, i)} ref={(el) => fileInputs.current[i] = el}/>
            <div className="editor-content-block-lista-icones-item__icon-preview" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
          </div>
          <input className="editor-content-block-lista-icones-item__text-input" placeholder="Texto..." type="text" value={item.text} onChange={(event) => handleItemTextChange(event, i)}/>
        </div>
      )
    })
  }

  return (
    <div className="editor-content-block editor-content-block-lista-icones" data-tip={DND_TYPE} data-for={DND_TYPE}>
      <button className="editor-content-block-lista-icones_add" onClick={handleAddItemClick}>
        <i data-feather="plus"></i>
        Adicionar item
      </button>

      {renderItems()}

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        place="right"
      />
    </div>
  )
}

