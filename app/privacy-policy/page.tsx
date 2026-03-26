import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Política de Privacidad
        </h1>

        <p className="mb-4 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4 text-gray-700">
          <p>
            En <strong>Tu Empresa</strong>, valoramos y respetamos tu
            privacidad. Esta Política de Privacidad describe cómo recopilamos,
            usamos y protegemos tu información personal cuando utilizas nuestra
            plataforma.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            1. Información que recopilamos
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Datos de identificación como nombre y correo electrónico.</li>
            <li>Información de cuentas conectadas (por ejemplo, Facebook).</li>
            <li>Datos técnicos como IP, navegador y dispositivo.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900">
            2. Uso de la información
          </h2>
          <p>
            Utilizamos la información recopilada para operar, mantener y mejorar
            nuestros servicios, así como para ofrecer integraciones y soporte
            personalizado.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            3. Integraciones con terceros
          </h2>
          <p>
            Nuestra plataforma puede integrarse con servicios de terceros como
            Facebook o Instagram. El uso de estos servicios está sujeto a sus
            propias políticas de privacidad.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            4. Protección de la información
          </h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger tu información contra accesos no autorizados, pérdida o uso
            indebido.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            5. Derechos del usuario
          </h2>
          <p>
            Puedes solicitar el acceso, corrección o eliminación de tus datos
            personales en cualquier momento escribiéndonos a nuestro canal de
            soporte.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            6. Cambios en esta política
          </h2>
          <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad.
            Cualquier cambio será notificado a través de la plataforma.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">7. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta Política de Privacidad, puedes
            contactarnos en <strong>contacto@tuempresa.com</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
