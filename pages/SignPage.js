import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import Button from '../components/Button';
import {colors} from '../style/colors';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

export default function SignPage({navigation}) {
  const [loading, setLoading] = useState(false);

  async function signHandler(values) {
    try {
      await auth().createUserWithEmailAndPassword(
        values.usermail,
        values.password,
      );
      showMessage({
        message: 'KAYIT BAŞARILI',
        type: 'success',
      });
      navigation.navigate('AuthStack', { screen: 'LoginPage' });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showMessage({
          message: 'Bu e-posta adresi zaten kullanılıyor!',
          type: 'danger',
        });
      }

      if (error.code === 'auth/invalid-email') {
        showMessage({
          message: 'Geçersiz e-posta adresi!',
          type: 'danger',
        });
      }
    }
  }

  return (
    <View style={styles.signContainer}>
      <Text style={styles.title}>chatX#</Text>
      <Formik
        initialValues={initialFormValues}
        onSubmit={signHandler}
        validate={(values) => {
          const errors = {};
          if (!values.usermail) {
            errors.usermail = 'E-posta alanı boş bırakılamaz';
          } else if (!/\S+@\S+\.\S+/.test(values.usermail)) {
            errors.usermail = 'Geçerli bir e-posta adresi giriniz';
          }

          if (!values.password) {
            errors.password = 'Şifre alanı boş bırakılamaz';
          } else if (values.password.length < 6) {
            errors.password = 'Şifre en az 6 karakter olmalıdır';
          }

          if (!values.repassword) {
            errors.repassword = 'Şifre tekrarı alanı boş bırakılamaz';
          } else if (values.password !== values.repassword) {
            errors.repassword = 'Şifreler uyuşmuyor';
          }

          return errors;
        }}
      >
        {({values, handleChange, handleSubmit, errors}) => (
          <>
            <TextInput
              onChangeText={handleChange('usermail')}
              value={values.usermail}
              style={styles.input}
              placeholder="E-posta..."
            />
            {errors.usermail && (
              <Text style={styles.errorText}>{errors.usermail}</Text>
            )}

            <TextInput
              onChangeText={handleChange('password')}
              value={values.password}
              style={styles.input}
              placeholder="Şifre..."
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              onChangeText={handleChange('repassword')}
              value={values.repassword}
              style={styles.input}
              placeholder="Tekrar Şifre..."
              secureTextEntry
            />
            {errors.repassword && (
              <Text style={styles.errorText}>{errors.repassword}</Text>
            )}

            <Button text="Kayıt Ol" onPress={handleSubmit} loading={loading} />
          </>
        )}
      </Formik>
      <Button
        text="Zaten hesabınız var mı?"
        iconName="chevron-right"
        iconColor={colors.mainOrange}
        iconSize={24}
        theme="secondary"
        onPress={() => navigation.navigate('LoginPage')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    gap: 10,
  },
  title: {
    fontSize: 87,
    color: colors.mainOrange,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(116, 116, 116, 0.16)',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
