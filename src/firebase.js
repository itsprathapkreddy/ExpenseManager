import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyC9Mb1aRk1MIwNxyFKzV0cpOPcZ54s5Ac0',
	authDomain: 'expensemanager-993c2.firebaseapp.com',
	projectId: 'expensemanager-993c2',
	storageBucket: 'expensemanager-993c2.appspot.com',
	messagingSenderId: '801186581077',
	appId: '1:801186581077:web:13ec899f650a4d29d8e2dc',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
