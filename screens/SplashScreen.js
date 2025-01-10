import { StyleSheet, View, Image} from "react-native";
import image_splash from "../assets/toolsmanager_logo_splash.png";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
        <Image source={image_splash} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "cover"
  }
});
