import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, NavLink } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
	const {user} = useContext(Context)
	const location = useLocation();
	const navigate = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onClick = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password);
			}else {
				data = await registration(email, password);
			}
			user.setUser(data);
			user.setIsAuth(true);
			navigate(SHOP_ROUTE);
		} catch (error) {
			alert(error.response.data.message)
		}
	};

	return (
		<Container 
			className='d-flex justify-content-center align-items-center'
			style={{height: window.innerHeight - 54}}
		>
			<Card style={{width: 600}} className="p-5">
				<h1 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
				<Form className="d-flex flex-column">
					<Form.Control 
						className='mt-3' 
						placeholder='Введите ваш email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control 
						className="mt-3" 
						placeholder="Введите ваш пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
					<div  className="d-flex justify-content-between mt-3">
					{isLogin ?
						<div>
							<NavLink href={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
						</div>
					:
						<div>
							<NavLink href={LOGIN_ROUTE}>Войти</NavLink>
						</div>
					}
						<Button 
							variant="outline-success"
							onClick={onClick}
						>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	)
});

export default Auth;
