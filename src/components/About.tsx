import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { useI18n } from "@/i18n";
import {
  Heart,
  Lightbulb,
  Users,
  Wrench,
  Music,
  Code,
  Bike,
  Waves,
  Gamepad2,
  PartyPopper,
} from "lucide-react";

type Profile = {
  waarden?: string[];
  hobbies?: string[];
};

export default function AboutMe() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/data/profile.json")
      .then((r) => r.json())
      .then((d) => setProfile({ waarden: d.waarden, hobbies: d.hobbies }))
      .catch(() => setProfile(null));
  }, []);

  const values = [
    { icon: <Heart className="w-5 h-5 text-pink-500" />, key: "value_reliable" },
    { icon: <Wrench className="w-5 h-5 text-blue-500" />, key: "value_handson" },
    { icon: <Users className="w-5 h-5 text-green-500" />, key: "value_collab" },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, key: "value_creative" },
  ];

  const hobbyKeys = [
    "hobby_guitar",
    "hobby_programming",
    "hobby_cycling",
    "hobby_swimming",
    "hobby_gaming",
    "hobby_friends",
    "hobby_ksalead",
  ];

  const iconFor = (key: string) => {
    switch (key) {
      case "hobby_guitar":
        return <Music className="w-5 h-5 text-purple-500" />;
      case "hobby_programming":
        return <Code className="w-5 h-5 text-blue-500" />;
      case "hobby_cycling":
        return <Bike className="w-5 h-5 text-emerald-500" />;
      case "hobby_swimming":
        return <Waves className="w-5 h-5 text-cyan-500" />;
      case "hobby_gaming":
        return <Gamepad2 className="w-5 h-5 text-orange-500" />;
      case "hobby_friends":
        return <PartyPopper className="w-5 h-5 text-pink-500" />;
      case "hobby_ksalead":
        return <Users className="w-5 h-5 text-amber-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Section id="about" title={t("about_title")} subtitle={t("about_subtitle")}>
      <motion.div
        className="space-y-8 text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto relative"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Foto rechts */}
        <div className="absolute hidden lg:block right-[-160px] top-6 w-40 h-40">
          <div className="absolute -inset-4 blur-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent rounded-full opacity-60" />
          <img
            src="/images/portrait.jpg"
            alt={t("about_portrait_alt")}
            className="w-40 h-40 object-cover rounded-full border border-border shadow-md"
          />
        </div>

        {/* Tekst */}
        <p>
          {t("about_p1_a")} {t("about_p1_b")}
        </p>

        <p>{t("about_ksa_status")}</p>

        {/* Waarden */}
        <div>
          <h3 className="text-base font-semibold mb-3">{t("values_title")}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/40 transition"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                {v.icon}
                <span className="text-sm font-medium">{t(v.key)}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hobby’s */}
        <div>
          <h3 className="text-base font-semibold mb-3">{t("hobbies_title")}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hobbyKeys.map((key, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/30 transition"
              >
                {iconFor(key)}
                <span className="text-sm font-medium">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        <p>{t("about_p3")}</p>
      </motion.div>
    </Section>
  );
}
