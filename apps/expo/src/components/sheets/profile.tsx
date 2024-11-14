import { Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import "react-native-svg";

import React, { useState } from "react";

import type { RadioGroupOptionValue } from "../radio";
import { api } from "~/utils/api";
import { Button } from "../button";
import { RadioGroup } from "../radio";
import { useUser } from "../user";

type Gender = keyof typeof GENDERS;
type RelationshipStatus = keyof typeof RELATIONSHIPS;
type Duration = keyof typeof DURATIONS;

interface FormValues {
  gender?: Gender | null;
  genderPreference?: Gender | null;
  relationshipStatus?: RelationshipStatus | null;
  relationshipDuration?: Duration | null;
}

function Section({ children }: { children: React.ReactNode }) {
  return <View className="gap-2">{children}</View>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text className="font-medium text-foreground">{children}</Text>;
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

  const [formValues, setFormValues] = useState<FormValues>({
    ...profile.data,
  });

  function createOnChangeField<Field extends keyof FormValues>(
    field: Field,
  ): (value: FormValues[Field]) => void {
    return (value) =>
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
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
    ([key, value]) => profile.data?.[key as keyof FormValues] !== value,
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
          <RadioGroup
            options={
              Object.entries(GENDERS).map(([key, value]) => ({
                value: key,
                label: value,
              })) as RadioGroupOptionValue<Gender>[]
            }
            selected={formValues.gender}
            onChange={createOnChangeField("gender")}
          />
        </Section>
        <Section>
          <SectionTitle>They are</SectionTitle>
          <RadioGroup
            options={
              Object.entries(GENDERS).map(([key, value]) => ({
                value: key,
                label: value,
              })) as RadioGroupOptionValue<Gender>[]
            }
            selected={formValues.genderPreference}
            onChange={createOnChangeField("genderPreference")}
          />
        </Section>
        <Section>
          <SectionTitle>We are</SectionTitle>
          <RadioGroup
            options={
              Object.entries(RELATIONSHIPS).map(([key, value]) => ({
                value: key,
                label: value,
              })) as RadioGroupOptionValue<RelationshipStatus>[]
            }
            selected={formValues.relationshipStatus}
            onChange={createOnChangeField("relationshipStatus")}
          />
        </Section>
        <Section>
          <SectionTitle>For</SectionTitle>
          <RadioGroup
            options={
              Object.entries(DURATIONS).map(([key, value]) => ({
                value: key,
                label: value,
              })) as RadioGroupOptionValue<Duration>[]
            }
            selected={formValues.relationshipDuration}
            onChange={createOnChangeField("relationshipDuration")}
          />
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
