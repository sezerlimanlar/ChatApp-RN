import React, {useState, useEffect, createContext, useContext} from 'react';
import auth from '@react-native-firebase/auth'; // Firebase Authentication modülü

// AuthContext'i oluşturuyoruz
const AuthContext = createContext();

// AuthProvider: Kullanıcı durumu sağlayıcı bileşen
export default function AuthProvider({children}) {
  const [user, setUser] = useState(null); // Kullanıcı durumu

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser); // Kullanıcı durumu değiştikçe güncellenir
    return () => unsubscribe(); // Component unmount olduğunda subscription temizlenir
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {children} {/* Children burada sarmalanan bileşenlerdir */}
    </AuthContext.Provider>
  );
}

// useAuthContext: Context üzerinden kullanıcı verisini almak için custom hook
const useAuthContext = () => {
  const context = useContext(AuthContext); // Context'ten kullanıcı bilgilerini alır
  console.log(context);
  if (context === undefined)
    throw new Error('Context was used outside of AuthProvider');

  return context;
};

export {AuthContext, useAuthContext}; // useAuthContext dışa aktarılıyor
