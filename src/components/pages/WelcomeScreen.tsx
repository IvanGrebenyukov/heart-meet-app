import { Link } from 'react-router-dom'
import { Button } from '../ui/buttons/Button.tsx'


export const WelcomeScreen = () => {
	return (
		<div className={'space-y-4'}>
			<Link to={'/signup-second'}>
				<Button className={''}>Sign Up</Button>
			</Link>
			<Link to={'login'}>
				<Button className={'ml-2'}>Log In</Button>
			</Link>
			
		</div>
	)
}