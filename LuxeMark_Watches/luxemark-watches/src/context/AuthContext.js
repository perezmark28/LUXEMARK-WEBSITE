import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const saved = localStorage.getItem('luxemark-user');
		if (saved) setUser(JSON.parse(saved));
	}, []);

	useEffect(() => {
		if (user) localStorage.setItem('luxemark-user', JSON.stringify(user));
		else localStorage.removeItem('luxemark-user');
	}, [user]);

	const signup = async ({ name, email, password }) => {
		// Demo: pretend success and "create" user
		setUser({ name, email });
		return { ok: true };
	};

	const login = async ({ email }) => {
		// Demo: accept any email/password
		setUser({ name: email.split('@')[0], email });
		return { ok: true };
	};

	const logout = () => setUser(null);

	return (
		<AuthContext.Provider value={{ user, signup, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};


