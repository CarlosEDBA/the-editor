import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addBlock,
  updateBlock,
} from '@/actions/BlockTree'

import EditorContentBlockTooltip from '@/components/EditorContentBlockTooltip'

import useFeather from '@/hooks/useFeather'

import Log from '@/utils/Log'

import { DND_EDITOR_SIDEBAR_BLOCK_TITLE } from '@/dndTypes'

export default function EditorContentBlockTitle(props) {
  useFeather()

  const DND_TYPE = DND_EDITOR_SIDEBAR_BLOCK_TITLE

  const id = props.id
  const parentId = props.parentId
  const onDelete = props.onDelete
  const onMoveUp = props.onMoveUp
  const onMoveDown = props.onMoveDown

  const blockTree = useSelector(state => state.BlockTree)

  const [content, setContent] = useState('')

  const dispatch = useDispatch()

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

  function handleChange(event) {
    const target = event.currentTarget

    let value = target.value

    setContent(value)

    dispatch(updateBlock(id, {
      content: value
    }))
  }

  return (
    <div className="editor-content-block editor-content-block-title" data-tooltip-id={DND_TYPE}>
      <input placeholder="Title" value={content} onChange={handleChange}/>

      <EditorContentBlockTooltip
        id={DND_TYPE}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />
    </div>
  )
}

