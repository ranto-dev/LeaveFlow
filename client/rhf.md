Parfait 👍
Je vais t’expliquer **React Hook Form (RHF)** de manière **progressive**, **pratique** et **orientée formulaires réels**, comme tu les rencontres dans tes projets React + Tailwind.

---

# 📘 Apprendre React Hook Form (RHF)

## 🚀 Pourquoi React Hook Form ?

React Hook Form permet de :

* gérer les formulaires **sans state inutile**
* améliorer les **performances**
* simplifier la **validation**
* réduire énormément le **code boilerplate**

👉 Très utilisé en production.

---

## 📦 Installation

```bash
npm install react-hook-form
```

ou

```bash
yarn add react-hook-form
```

---

## 🧠 Concept clé

> RHF utilise les **refs** au lieu du `useState`.

Donc :

* ❌ pas de `onChange + setState`
* ✅ un seul hook `useForm`

---

## 🧩 Formulaire simple (bases)

```tsx
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

export default function SimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: "Nom obligatoire" })}
        placeholder="Nom"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("email", {
          required: "Email obligatoire",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Email invalide"
          }
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Envoyer</button>
    </form>
  );
}
```

---

## 🧪 Validation intégrée

### Règles courantes

```ts
register("password", {
  required: true,
  minLength: 8,
  maxLength: 20
});
```

| Règle       | Description              |
| ----------- | ------------------------ |
| `required`  | champ obligatoire        |
| `minLength` | longueur minimale        |
| `maxLength` | longueur maximale        |
| `pattern`   | regex                    |
| `validate`  | validation personnalisée |

---

## 🔐 Validation personnalisée

```tsx
register("age", {
  validate: value => value >= 18 || "Vous devez être majeur"
});
```

---

## 🧠 Accéder à l’état du formulaire

```ts
formState: {
  errors,
  isSubmitting,
  isValid,
  dirtyFields
}
```

Exemple :

```tsx
<button disabled={!isValid || isSubmitting}>
  Envoyer
</button>
```

---

## 🔄 Valeurs par défaut

```ts
useForm({
  defaultValues: {
    name: "Aina",
    email: "aina@email.com"
  }
});
```

---

## 🧩 Champs contrôlés (select, checkbox, custom input)

### Avec `Controller`

```tsx
import { Controller } from "react-hook-form";

<Controller
  name="role"
  control={control}
  rules={{ required: true }}
  render={({ field }) => (
    <select {...field}>
      <option value="">Choisir</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  )}
/>
```

---

## 🔁 Réinitialiser le formulaire

```ts
reset();
```

ou

```ts
reset({ name: "", email: "" });
```

---

## 🧠 Observer un champ (`watch`)

```ts
const password = watch("password");
```

Très utile pour :

* confirmation mot de passe
* affichage dynamique

---

## 📤 Soumission async (API)

```tsx
const onSubmit = async (data: FormData) => {
  await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data)
  });
};
```

RHF gère automatiquement `isSubmitting`.

---

## 🧪 Exemple réel : formulaire d’inscription

Champs :

* nom
* email
* mot de passe
* confirmation

Tu veux que je te le construise **pas à pas** avec :

* React + TypeScript
* TailwindCSS
* validations solides ?

---

## 🧩 Librairies utiles avec RHF

| Lib                   | Rôle                 |
| --------------------- | -------------------- |
| `@hookform/resolvers` | connecter Yup / Zod  |
| `zod`                 | validation typée     |
| `yup`                 | validation classique |
| `react-query`         | soumission API       |

---

## 🎯 Prochaine étape (au choix)

1️⃣ RHF + **Zod** (pro)
2️⃣ Formulaire **login / register** complet
3️⃣ RHF + **Tailwind** (design propre)
4️⃣ Gestion des **erreurs serveur**
5️⃣ Multi-step form

👉 Dis-moi ce que tu veux apprendre en premier.
