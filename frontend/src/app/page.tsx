'use client'
import { useAuth } from "@/context/auth";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {user} = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if(!user){
      return router.push('/login')
    }
  },[user, router])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        main
      </main>
      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
