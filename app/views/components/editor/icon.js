/* eslint-disable @typescript-eslint/no-unused-vars */
import alignLeftIcon from './assets/align-left.svg'
import alignCenterIcon from './assets/align-center.svg'
import alignRightIcon from './assets/align-right.svg'
import alignJustifyIcon from './assets/align-justify.svg'
import backgroundIcon from './assets/background.svg'
import blockquoteIcon from './assets/blockquote.svg'
import boldIcon from './assets/bold.svg'
import cleanIcon from './assets/clean.svg'
import codeIcon from './assets/code.svg'
import colorIcon from './assets/color.svg'
import directionLeftToRightIcon from './assets/direction-ltr.svg'
import directionRightToLeftIcon from './assets/direction-rtl.svg'
import formulaIcon from './assets/formula.svg'
import headerIcon from './assets/header.svg'
import header2Icon from './assets/header-2.svg'
import italicIcon from './assets/italic.svg'
import imageIcon from './assets/image.svg'
import indentIcon from './assets/indent.svg'
import outdentIcon from './assets/outdent.svg'
import linkIcon from './assets/link.svg'
import listBulletIcon from './assets/list-bullet.svg'
import listCheckIcon from './assets/list-check.svg'
import listOrderedIcon from './assets/list-ordered.svg'
import subscriptIcon from './assets/subscript.svg'
import superscriptIcon from './assets/superscript.svg'
import strikeIcon from './assets/strike.svg'
import tableIcon from './assets/table.svg'
import underlineIcon from './assets/underline.svg'
import videoIcon from './assets/video.svg'

// 新增
import UnderlineSvg from './assets/underlined.svg'
import StrikeThroughSvg from './assets/strikethrough.svg'
import RedoSvg from './assets/redo.svg'
import UndoSvg from './assets/undo.svg'
import ListNumberedSvg from './assets/list_numbered.svg'
import ListBulletedSvg from './assets/list_bulleted.svg'
import AlignSvg from './assets/align.svg'
import IndentDecreaseSvg from './assets/indent_decrease.svg'
import IndentIncreaseSvg from './assets/indent_increase.svg'
import ClearSvg from './assets/clear.svg'
import LinkSvg from './assets/insertlink.svg'
import ColorSvg from './assets/fontcolor.svg'

export default {
  align: {
    '': AlignSvg,
    center: alignCenterIcon,
    right: alignRightIcon,
    justify: alignJustifyIcon
  },
  background: backgroundIcon,
  blockquote: blockquoteIcon,
  bold: boldIcon,
  clean: ClearSvg,
  code: codeIcon,
  'code-block': codeIcon,
  color: ColorSvg,
  direction: {
    '': directionLeftToRightIcon,
    rtl: directionRightToLeftIcon
  },
  formula: formulaIcon,
  header: {
    1: headerIcon,
    2: header2Icon
  },
  italic: italicIcon,
  image: imageIcon,
  indent: {
    '+1': IndentIncreaseSvg,
    '-1': IndentDecreaseSvg
  },
  link: LinkSvg,
  list: {
    bullet: ListBulletedSvg,
    check: listCheckIcon,
    ordered: ListNumberedSvg
  },
  script: {
    sub: subscriptIcon,
    super: superscriptIcon
  },
  strike: StrikeThroughSvg,
  table: tableIcon,
  underline: UnderlineSvg,
  video: videoIcon,
  redo: RedoSvg,
  undo: UndoSvg
}
