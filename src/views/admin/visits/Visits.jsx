import { Link } from 'react-router-dom';
import { useVisitsStore } from "../../../context/useVisitsStore.js";
import { useEffect, useRef, useState } from "react";
import { VisitItem } from "../../../components/VisitItem.jsx";
import Chart from "chart.js/auto";
import Spinner from "../../../components/Spinner.jsx";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const Visits = () => {
    const getVisits = useVisitsStore((state) => state.getVisits);
    const visits = useVisitsStore((state) => state.visits);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const [barChartInstance, setBarChartInstance] = useState(null);
    const [pieChartInstance, setPieChartInstance] = useState(null);
    const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0]);
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const pdfContentRef = useRef(null); // Ref para el contenido del PDF

    useEffect(() => {
        const fetchData = async () => {
            await getVisits();
            setLoading(false); // Datos cargados
        };

        fetchData();
    }, [getVisits]);

    useEffect(() => {
        if (visits.length > 0) {
            // Código existente para el gráfico de barras
            const categorieCounts = visits.reduce((acc, visit) => {
                acc[visit.id_categorie_question] = (acc[visit.id_categorie_question] || 0) + 1;
                return acc;
            }, {});

            const categorieData = [0, 0, 0, 0, 0, 0];
            Object.keys(categorieCounts).forEach(categorieId => {
                categorieData[categorieId - 1] = categorieCounts[categorieId];
            });

            setChartData(categorieData);

            // Nuevo código para el gráfico de pastel
            const studentCounts = visits.reduce((acc, visit) => {
                const studentName = visit.students.name;
                acc[studentName] = (acc[studentName] || 0) + 1;
                return acc;
            }, {});

            const studentLabels = Object.keys(studentCounts);
            const studentData = Object.values(studentCounts);

            setPieChartData({ labels: studentLabels, data: studentData });
        }
    }, [visits]);

    useEffect(() => {
        if (barChartRef.current) {
            if (barChartInstance) {
                barChartInstance.destroy();
            }
            const newBarChartInstance = new Chart(barChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Requisitos de Elegibilidad', 'Destinos de movilidad', 'Información General', 'Proceso de Aplicación', 'Créditos y Convalidación', 'Financiamiento y Becas'],
                    datasets: [{
                        label: '# de Categorias por Visitas',
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            setBarChartInstance(newBarChartInstance);
        }

        if (pieChartRef.current && pieChartData.labels && pieChartData.data) {
            if (pieChartInstance) {
                pieChartInstance.destroy();
            }
            const newPieChartInstance = new Chart(pieChartRef.current, {
                type: 'pie',
                data: {
                    labels: pieChartData.labels,
                    datasets: [{
                        data: pieChartData.data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        hoverOffset: 4
                    }]
                }
            });
            setPieChartInstance(newPieChartInstance);
        }
    }, [chartData, pieChartData]);

    const downloadPDF = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const input = pdfContentRef.current;

        await html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('visitas.pdf');
        });
    };

    return (
        <div>
            <div className="w-4/6 mx-auto flex justify-between items-center">
                <Link to="/"
                      className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg  inline-block "
                >
                    Volver
                </Link>
                <Link to="/admin/visits/register"
                      className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg  inline-block "
                >
                    Registrar Visita
                </Link>
                <button
                    onClick={downloadPDF}
                    className="p-3 bg-blue-500 hover:bg-blue-600 transition-all hover:text-white font-bold rounded-lg inline-block"
                >
                    Descargar PDF
                </button>
            </div>
            {loading ? (
                <Spinner text="Loading..." />
            ) : (
                <div ref={pdfContentRef} className="w-4/6 mx-auto">
                    <h1 className="text-3xl font-bold mt-5">Visitas en el departamento</h1>
                    <div className="mt-3 bg-white shadow-lg mb-5 max-h-96 rounded-xl overflow-y-scroll">
                        {visits?.map((visit) => (
                            <VisitItem
                                key={visit.id}
                                visit={visit}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center my-10">
                        <div className="w-4/6">
                            <canvas ref={barChartRef}></canvas>
                        </div>
                        <div className="w-2/6">
                            <canvas ref={pieChartRef}></canvas>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
