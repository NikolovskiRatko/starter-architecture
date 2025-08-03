<script setup lang="ts">
  import { IconChartpie, IconDollar, IconLibrary } from '@starter-core/icons';
  import { ref, onMounted } from 'vue';
  import { PageWrapper } from '@/components';
  import { useRootStore } from '@/store/root';
  import { AccordionContent, AccordionItem } from '@starter-core/dash-ui/src';

  // const categories = ref([]);
  const isLoading = ref(false);
  const { setActiveClasses } = useRootStore();
  onMounted(() => {
    isLoading.value = true;
    setActiveClasses({
      main: 'item_dashboard',
      sub: 'item_dashboard',
      title: 'strings.dashboard',
    });

    // get('/common/dashboard/get')
    //     .then((response) => {
    //         isLoading.value = false;
    //         categories.value = response.data;
    //     })
  });
</script>
<template>
  <PageWrapper>
    <div class="row">
      <div class="col-md-6 offset-3">
        <AccordionContent>
          <AccordionItem label="Integration and Interoperability" id="integration-interoperability" :icon="IconChartpie">
            Our architecture seamlessly integrates two distinct frontend applications backed by a single backend API to provide a
            comprehensive user experience. This integrated approach allows us to maintain separation between administrative tasks
            and public-facing content delivery, ensuring a responsive and SEO-friendly web application for all users.
          </AccordionItem>

          <AccordionItem label="Admin Panel (Vue.js Single Page Application)" id="admin-panel" :icon="IconLibrary">
            The integration of Laravel and Vue.js begins with Laravel serving as the foundation. Laravel bootstraps the Vue.js
            Single Page Application (SPA) by providing the essential web routes, including user authentication and authorization
            mechanisms. Admin users benefit from a feature-rich Admin Panel built using Vue.js. This panel, hosted within the same
            domain as the Laravel API, offers an intuitive interface for managing and overseeing various aspects of the
            application.
          </AccordionItem>

          <AccordionItem label="Public Content (Nuxt Server Side Rendering)" id="public-content" :icon="IconDollar">
            Recognizing the importance of a distinct, public-facing interface, we've provisioned a separate front-end built on
            Nuxt, leveraging server-side rendering (SSR). Nuxt, powered by Node.js and managed by pm2, optimizes content delivery
            for public users. This architecture not only provides swift and efficient content rendering but also excels in search
            engine optimization (SEO). The Nuxt SSR application utilizes the Laravel application as an API, ensuring data
            consistency and efficient communication between the frontend and backend.
          </AccordionItem>

          <AccordionItem label="Infrastructure (Docker, Terraform, Ansible, Jenkins)" id="infrastructure" :icon="IconChartpie">
            Our infrastructure seamlessly integrates with the application layers. For local development, Docker Compose is
            employed to create a Dockerized environment consisting of Apache/PHP, MySQL, Node.js, and Redis containers. This
            environment closely mirrors our production setup, ensuring consistency during development.
            <br /><br />
            On live servers, Terraform orchestrates the creation and configuration of servers and DNS records. Ansible Playbooks
            are then used for provisioning these servers. Two servers are created: one hosts the application, while the other, a
            Jenkins server, manages our CI/CD processes. The Jenkins server is tightly integrated with GitHub, automating the
            creation of multipipeline jobs. Each project defines its pipelines, including a Dockerized build environment via
            Docker Compose. These pipelines manage the build stage and incorporate Ansible Playbooks for zero downtime deployments
            and rollback mechanisms in case of failures.
          </AccordionItem>
        </AccordionContent>
      </div>
    </div>
  </PageWrapper>
</template>
