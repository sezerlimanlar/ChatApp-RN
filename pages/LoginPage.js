import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import Button from '../components/Button';
import {colors} from '../style/colors';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const initialFormValues = {
  usermail: '',
  password: '',
};

export default function LoginPage({navigation}) {
  async function loginHandler(values) {
    try {
      await auth().signInWithEmailAndPassword(values.usermail, values.password);
      showMessage({
        message: 'Giriş Başarılı',
        type: 'success',
      });
      navigation.navigate('AppTabs', { screen: 'RoomsPage' });
    } catch (error) {
      console.log(error.code);
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>chatX# </Text>
      <Formik initialValues={initialFormValues} onSubmit={loginHandler}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <TextInput
              onChangeText={handleChange('usermail')}
              value={values.usermail}
              style={styles.input}
              placeholder="E-posta..."
            />
            <TextInput
              onChangeText={handleChange('password')}
              value={values.password}
              style={styles.input}
              placeholder="Şifre..."
              secureTextEntry
            />
            <Button
              text="Giriş Yap"
              onPress={handleSubmit}
              loading={false}
            />
          </>
        )}
      </Formik>
      <Button
        iconName="user-plus"
        text="Henüz kayıt olmadınız mı?"
        theme="secondary"
        iconColor={colors.mainOrange}
        iconSize={24}
        loading={false}
        onPress={() => navigation.navigate('Sign')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    gap: 10,
  },
  title: {
    fontSize: 87,
    color: colors.mainOrange,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(116, 116, 116, 0.16)',
  },
});
