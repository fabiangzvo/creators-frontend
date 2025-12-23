import React from "react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Términos y Condiciones del Servicio
        </h1>

        <p className="mb-4 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4 text-gray-700">
          <p>
            Estos Términos y Condiciones regulan el acceso y uso de la plataforma
            de <strong>Tu Empresa</strong>. Al acceder o utilizar el servicio,
            aceptas cumplir con estos términos.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            1. Uso del servicio
          </h2>
          <p>
            El usuario se compromete a utilizar la plataforma de forma lícita y
            conforme a la legislación vigente, absteniéndose de realizar
            actividades que puedan dañar, sobrecargar o deteriorar el servicio.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            2. Registro y cuentas
          </h2>
          <p>
            Para acceder a determinadas funcionalidades, puede ser necesario
            crear una cuenta. El usuario es responsable de mantener la
            confidencialidad de sus credenciales.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            3. Integraciones con terceros
          </h2>
          <p>
            La plataforma puede ofrecer integraciones con servicios de terceros
            como Facebook o Instagram. <strong>Tu Empresa</strong> no se
            responsabiliza por el uso o políticas de dichos servicios externos.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            4. Propiedad intelectual
          </h2>
          <p>
            Todos los contenidos, marcas y elementos de la plataforma son
            propiedad de <strong>Tu Empresa</strong> o de sus licenciantes. Queda
            prohibida su reproducción sin autorización expresa.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            5. Suspensión del servicio
          </h2>
          <p>
            Nos reservamos el derecho de suspender o cancelar el acceso al
            servicio en caso de uso indebido, incumplimiento de estos términos o
            por razones técnicas.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            6. Limitación de responsabilidad
          </h2>
          <p>
            El servicio se proporciona "tal cual". <strong>Tu Empresa</strong>
            no será responsable por daños directos o indirectos derivados del
            uso o imposibilidad de uso de la plataforma.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            7. Modificaciones
          </h2>
          <p>
            Podemos modificar estos Términos y Condiciones en cualquier momento.
            Las actualizaciones serán publicadas en la plataforma y entrarán en
            vigor desde su publicación.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            8. Legislación aplicable
          </h2>
          <p>
            Estos términos se rigen por las leyes aplicables del país donde
            opere <strong>Tu Empresa</strong>, sin perjuicio de las normas de
            protección al consumidor.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">9. Contacto</h2>
          <p>
            Para cualquier duda relacionada con estos Términos y Condiciones,
            puedes escribirnos a <strong>contacto@tuempresa.com</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
