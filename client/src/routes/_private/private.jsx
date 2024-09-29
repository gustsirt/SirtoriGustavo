import { createFileRoute } from '@tanstack/react-router'
import {Icon, iconMap} from '../../modules/icons/iconifyIcon'

export const Route = createFileRoute('/_private/private')({
  component: PrivateHome
})

function PrivateHome () {
  return (<>
    <div>Hello /_private/private!</div>
    <Icon icon={iconMap.frameworks.Nodejs}/>
  </>)
}