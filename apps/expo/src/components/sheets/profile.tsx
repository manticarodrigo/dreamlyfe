import { ScrollView, Text, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

import "react-native-svg";

import { Button } from "../button";
import { RadioGroup } from "../radio";

function Section({ children }: { children: React.ReactNode }) {
  return <View className="flex-col gap-2">{children}</View>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text className="font-medium text-foreground">{children}</Text>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

export function ProfileModal() {
  return (
    <ActionSheet
      gestureEnabled
      containerStyle={{
        backgroundColor: "rgba(35,31,32,1)",
      }}
      indicatorStyle={{
        width: 100,
      }}
    >
      <View className="h-[500px] flex-col gap-6 p-4">
        <Section>
          <SectionTitle>I am</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={["Female", "Male", "Other"]}
              selected="Female"
              onChange={(value) => console.log(value)}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>They are</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={["Female", "Male", "Other"]}
              selected="Male"
              onChange={(value) => console.log(value)}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>We are</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={["Dating", "In A Relationship", "Married"]}
              selected="Dating"
              onChange={(value) => console.log(value)}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>For</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={[
                "< Week",
                "< Month",
                "< 6 Months",
                "< Year",
                "1-2 Years",
                "3-5 Years",
                "5+ Years",
              ]}
              selected="< Month"
              onChange={(value) => console.log(value)}
            />
          </SectionContent>
        </Section>
        <Button variant="secondary">Save Profile</Button>
      </View>
    </ActionSheet>
  );
}
