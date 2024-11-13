import type { VideoSource } from "expo-video";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";

const videoSource: VideoSource =
  "https://s3-figma-videos-production-sig.figma.com/video/997496200047939199/TEAM/560e/693d/-01a0-459f-95a2-aca810aee975?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=magFqaPFIXAh9e4BzVbqiFas1Yw5yw2457H~DUhjfJWZD1nTITdXK-cMosDUQlhVnW7evl-wu9mwW9FTyr2wMzG8PNSXdBnbIDHWSomN5MIvuIa~CfVeAfL3T8cbOTr9V44tzX-uZfbAbIdJulBo4KYQrmJSLAn-qs8rLOnPOuCqEdgSiND8W8AxXKHgRKg8KqURd6YQ~FlEchjg-9KuoFuKNiiEl6gr9ZQfy8DPTP-mQNQdkmPl9BicY~eFoEnUA3boyoymhl3iMClNDOoJPjiNDNiuHHy80ErC-JLJOKyPfOXS9TJlkc0bXKefjCiYhmDINQgWpJ~PyYEhPk6GgQ__";

export default function Index() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.muted = true;
    player.loop = true;
    player.play();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VideoView
        contentFit="cover"
        nativeControls={false}
        style={StyleSheet.absoluteFill}
        player={player}
      />
      <Pressable
        className="flex-1 flex-col justify-between pb-6 pt-8"
        onPress={() => {
          router.replace("/home");
        }}
      >
        <Text className="text-center text-xl font-black uppercase text-foreground">
          Find your flags
        </Text>
        <Text className="text-center text-lg font-medium text-foreground">
          Tap anywhere to start
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
