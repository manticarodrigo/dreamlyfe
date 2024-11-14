import { ScrollView, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import "react-native-svg";

import { useState } from "react";

import type { RadioGroupOptionValue } from "../radio";
import { api } from "~/utils/api";
import { Button } from "../button";
import { RadioGroup } from "../radio";
import { useUser } from "../user";

function Section({ children }: { children: React.ReactNode }) {
  return <View className="gap-2">{children}</View>;
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

const GENDERS = {
  FEMALE: "Female",
  MALE: "Male",
  OTHER: "Other",
} as const;

const RELATIONSHIPS = {
  DATING: "Dating",
  RELATIONSHIP: "In A Relationship",
  MARRIED: "Married",
} as const;

const DURATIONS = {
  LESS_THAN_1_WEEK: "< Week",
  LESS_THAN_1_MONTH: "< Month",
  LESS_THAN_6_MONTHS: "< 6 Months",
  LESS_THAN_1_YEAR: "< Year",
  "1_TO_2_YEARS": "1-2 Years",
  "3_TO_5_YEARS": "3-5 Years",
  MORE_THAN_5_YEARS: "5+ Years",
} as const;

export function ProfileModal() {
  const { userId } = useUser();

  const profile = api.user.profile.get.useQuery(
    { userId },
    { enabled: !!userId },
  );

  const upsert = api.user.profile.upsert.useMutation();

  const [formValues, setFormValues] = useState({
    ...profile.data,
  });

  function createOnChangeField(field: keyof typeof formValues) {
    return (value: (typeof formValues)[typeof field]) =>
      setFormValues((prev) => {
        const next = {
          ...prev,
          [field]: value,
        };
        return next;
      });
  }

  function saveProfile() {
    if (userId) {
      upsert.mutate(
        { ...formValues, userId },
        {
          onSuccess: () => {
            void profile.refetch();
          },
        },
      );
    }

    void SheetManager.hide("profile");
  }

  const hasChanges = Object.entries(formValues).some(
    ([key, value]) => profile.data?.[key as keyof typeof formValues] !== value,
  );

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
      <View className="h-[500px] gap-6 p-4">
        <Section>
          <SectionTitle>I am</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={
                Object.entries(GENDERS).map(([key, value]) => ({
                  value: key,
                  label: value,
                })) as RadioGroupOptionValue<keyof typeof GENDERS>[]
              }
              selected={formValues.gender}
              onChange={createOnChangeField("gender")}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>They are</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={
                Object.entries(GENDERS).map(([key, value]) => ({
                  value: key,
                  label: value,
                })) as RadioGroupOptionValue<keyof typeof GENDERS>[]
              }
              selected={formValues.genderPreference}
              onChange={createOnChangeField("genderPreference")}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>We are</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={
                Object.entries(RELATIONSHIPS).map(([key, value]) => ({
                  value: key,
                  label: value,
                })) as RadioGroupOptionValue<keyof typeof RELATIONSHIPS>[]
              }
              selected={formValues.relationshipStatus}
              onChange={createOnChangeField("relationshipStatus")}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>For</SectionTitle>
          <SectionContent>
            <RadioGroup
              options={
                Object.entries(DURATIONS).map(([key, value]) => ({
                  value: key,
                  label: value,
                })) as RadioGroupOptionValue<keyof typeof DURATIONS>[]
              }
              selected={formValues.relationshipDuration}
              onChange={createOnChangeField("relationshipDuration")}
            />
          </SectionContent>
        </Section>
        <Button
          variant={hasChanges ? "primary" : "secondary"}
          onPress={saveProfile}
        >
          Save Profile
        </Button>
      </View>
    </ActionSheet>
  );
}
