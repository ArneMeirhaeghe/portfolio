import { motion } from "framer-motion";
import Section from "./Section";
import { useI18n } from "@/i18n";
import { Heart, Lightbulb, Users, Wrench } from "lucide-react";

export default function AboutMe() {
  const { t } = useI18n();

  const values = [
    { icon: <Heart className="w-5 h-5 text-pink-500" />, label: t("Betrouwbaar & betrokken") },
    { icon: <Wrench className="w-5 h-5 text-blue-500" />, label: t("Hands-on & leergierig") },
    { icon: <Users className="w-5 h-5 text-green-500" />, label: t("Samenwerken & leiden") },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, label: t("Creatief & oplossingsgericht") },
  ];

  return (
    <Section id="about" title={t("Over mij")} subtitle={t("Wie ik ben en wat mij drijft")}>
      <motion.div
        className="space-y-8 text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>
          {t(
            "Ik ben Arne Meirhaeghe, een leergierige en creatieve full stack developer met een passie voor technologie, UX en teamwork. "
          )}
          {t(
            "Met ervaring in React, .NET en hardware-integratie bouw ik digitale oplossingen die zowel technisch sterk als gebruiksvriendelijk zijn."
          )}
        </p>

        <p>
          {t(
            "Mijn achtergrond als hoofdleiding bij KSA Deinze heeft me geleerd hoe belangrijk communicatie, verantwoordelijkheid en samenwerking zijn — vaardigheden die ik vandaag inzet in elk project."
          )}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 pt-4">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary/40 transition"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              {v.icon}
              <span className="text-sm font-medium">{v.label}</span>
            </motion.div>
          ))}
        </div>

        <p>
          {t(
            "Ik geloof in groeien door te doen: steeds bijleren, experimenteren met nieuwe technologieën en samen met anderen bouwen aan projecten die impact hebben."
          )}
        </p>
      </motion.div>
    </Section>
  );
}
