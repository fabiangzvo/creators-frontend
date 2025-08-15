"use client";

import { useState } from 'react';
import { Button } from "@heroui/button";
import { ChevronDown, Plus, MessageSquare, FolderOpen, Grid3x3, ChevronRight, Megaphone } from "lucide-react";
import Image from "next/image";

interface ExpandedSections { recientes: boolean; usuario: boolean }

export default function VerticalSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    recientes: true,
    usuario: false
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={`h-screen sticky top-0 bg-gray-50 transition-all duration-300 ${isExpanded ? 'w-72' : 'w-16'} flex flex-col border-r border-divider`}>
      {/* Header */}
      <div className="p-3 flex justify-center bg-white border-b border-gray-200">
        <Image src="/icon.png" alt="Logo" width={36} height={36} />
      </div>
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant='light'
              size='sm'
              onPress={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${!isExpanded ? '-rotate-90' : ''}`} />
            </Button>
            {isExpanded && <span className="font-semibold text-lg">Claude</span>}
          </div>
        </div>
      </div>

      {/* Nueva conversación */}
      <div className="p-3 bg-white border-b border-gray-200">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">
          <Plus className="w-4 h-4" />
          {isExpanded && <span>Nueva conversación</span>}
        </button>
      </div>

      {/* Menú principal */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="p-2">
          {/* Chats */}
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <MessageSquare className="w-4 h-4" />
            {isExpanded && <span>Chats</span>}
          </button>

          {/* Proyectos */}
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <FolderOpen className="w-4 h-4" />
            {isExpanded && <span>Proyectos</span>}
          </button>

          {/* Artefactos */}
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <Grid3x3 className="w-4 h-4" />
            {isExpanded && <span>Artefactos</span>}
          </button>
        </div>

        {isExpanded && (
          <>
            <div className="mx-4 my-2 border-t border-gray-200"></div>

            {/* Sección Recientes */}
            <div className="px-2">
              <button
                onClick={() => toggleSection('recientes')}
                className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span>Recientes</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${expandedSections.recientes ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer con usuario */}
      <div className="border-t border-gray-200 bg-white relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full p-3 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                FG
              </div>
              {isExpanded && (
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">Fabián Guzmán</div>
                  <div className="text-xs text-gray-500">Plan gratuito</div>
                </div>
              )}
            </div>
            {isExpanded && <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />}
          </div>
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute bottom-full left-0 w-full mb-1 p-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Perfil
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Configuración
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Actualizar plan
              </button>
              <div className="mx-2 my-1 border-t border-gray-200"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}