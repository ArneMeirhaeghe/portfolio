import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { useI18n } from "@/i18n";
import { Heart, Lightbulb, Users, Wrench, Music, Code } from "lucide-react";

type Profile = {
  waarden?: string[];
  hobbies?: string[]; // optioneel uit profile.json
};

export default function AboutMe() {
  const { t, lang } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Proberen in te laden uit profile.json (optioneel); veilig fallbacken.
    fetch("/data/profile.json")
      .then((r) => r.json())
      .then((d) => setProfile({ waarden: d.waarden, hobbies: d.hobbies }))
      .catch(() => setProfile(null));
  }, []);

  // Vooraf gedefinieerde waarden (consistent met jouw persona)
  const values = [
    { icon: <Heart className="w-5 h-5 text-pink-500" />, key: "value_reliable" },
    { icon: <Wrench className="w-5 h-5 text-blue-500" />, key: "value_handson" },
    { icon: <Users className="w-5 h-5 text-green-500" />, key: "value_collab" },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, key: "value_creative" },
  ];

  // Hobby’s – uit JSON indien aanwezig, anders nette defaults
  // We mappen de labels via i18n-keys zodat NL/EN werkt.
  const hobbiesFallback = ["hobby_guitar", "hobby_programming", "hobby_ksalead"];
  const hobbiesKeys =
    (profile?.hobbies?.length
      ? profile.hobbies.map((h) => {
          // probeer een i18n-key match te vinden; anders toon raw tekst uit JSON
          const normalized = h.toLowerCase();
          if (normalized.includes("gitaar")) return "hobby_guitar";
          if (normalized.includes("ksa")) return "hobby_ksalead";
          if (normalized.includes("code") || normalized.includes("program")) return "hobby_programming";
          return h; // direct printen als t(key) hem niet kent
        })
      : hobbiesFallback) as string[];

  return (
    <Section
      id="about"
      title={t("about_title")}
      subtitle={t("about_subtitle")}
      centerHeader
    >
      <motion.div
        className="relative space-y-8 max-w-4xl mx-auto text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Intro alinea's */}
        <p>
          {t("about_p1_a")} {t("about_p1_b")}
        </p>
        <p>{t("about_p2")}</p>

        {/* Waarden (geen dubbele info; compact met iconen) */}
        <div>
          <h3 className="text-base font-semibold mb-3">{t("values_title")}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-[0_0_25px_rgba(124,58,237,0.18)] transition"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {v.icon}
                <span className="text-sm font-medium">
                  {/* if key exists use t(key), else show key string */}
                  {t(v.key)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hobby’s (persoonlijke kleur, kort en to the point) */}
        <div>
          <h3 className="text-base font-semibold mb-3">{t("hobbies_title")}</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {hobbiesKeys.map((h, i) => {
              // kies een passend icoon per hobby-key of default
              const icon =
                h === "hobby_guitar" ? (
                  <Music className="w-5 h-5 text-purple-500" />
                ) : h === "hobby_programming" ? (
                  <Code className="w-5 h-5 text-blue-500" />
                ) : h === "hobby_ksalead" ? (
                  <Users className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                );

              // als het een bekende i18n-key is: t(h), anders toon raw tekst
              const label = t(h);
              const isTranslated = label !== h;

              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                >
                  {icon}
                  <span className="text-sm font-medium">
                    {isTranslated ? label : h}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slotzin */}
        <p>{t("about_p3")}</p>
      </motion.div>
    </Section>
  );
}
