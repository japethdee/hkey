import { useState, useEffect, useMemo } from "react";
import TrackPage from "../components/TrackPage";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "../styles/order-page.css";
import { FilePlus, History, MessageSquareQuote, Filter, Check, PackageSearch, Archive, PackageX, Truck, FolderDown, FolderUp, Locate, Undo } from "lucide-react";
import OrderIcon from "../assets/order.png";
import ChatHead from "../components/ChatHead";
import { motion } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import splashOrders from "../assets/ord-page.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as pdfjsLib from "pdfjs-dist";
import PropTypes from "prop-types";

const Orders = () => {
    const [showSplash, setShowSplash] = useState(true);

        useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1000);
        return () => clearTimeout(timer);
        }, []);
    const [activeTab, setActiveTab] = useState("orders");
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedReturnItems, setSelectedReturnItems] = useState({});
    const [returnReason, setReturnReason] = useState("");
    const [archives, setArchives] = useState([]);
    const [history, setHistory] = useState([]);
    const [returns, setReturns] = useState([]);
    const [pdfReturnData, setPdfReturnData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderSortCriteria, setOrderSortCriteria] = useState(["date"]);
    const [archiveSortCriteria, setArchiveSortCriteria] = useState(["date"]);
    const [deliverySortCriteria, setDeliverySortCriteria] = useState(["date"]);
    const [returnSortCriteria, setReturnSortCriteria] = useState(["date"]);

    const navigate = useNavigate();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [orders, setOrders] = useState([
        { id: 1, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "Order-1-20250318T035506336Z.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 2, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 3, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 4, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 5, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 6, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 7, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 8, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 8, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 9, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 10, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 11, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 12, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 13, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 14, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 15, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 16, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 17, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 18, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 10, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 20, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 21, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 22, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 23, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 24, description: "Antibiotics", orderDate: "2025-03-10", orderStatus: "Pending", orderedBy: "John Doe", invoice: "INV-12345.pdf", total: "$500", paymentStatus: "Unpaid", paymentDetails: "PAY-12345.pdf", orderType: "Delivery" },
        { id: 25, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
        { id: 26, description: "Vitamins", orderDate: "2025-03-08", orderStatus: "Completed", orderedBy: "Jane Smith", invoice: "INV-67890.pdf", total: "$800", paymentStatus: "Paid", paymentDetails: "PAY-67890.pdf", orderType: "Walk-in" },
    ]);
    
    const [tooltip, setTooltip] = useState({ visible: false, left: 0, top: 0, text: "" });
    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            left: rect.left + rect.width / 2 - 30,
            top: rect.top - 25,
            text
        });
    };
    const hideTooltip = () => setTooltip({ visible: false, left: 0, top: 0, text: "" });

    useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).href;
    }, []);
    const [deliveries, setDeliveries] = useState(orders.filter(order => order.orderType === "Delivery"));

    const sortedOrders = useMemo(() => {
        const criteria = activeTab === "archives" ? archiveSortCriteria : orderSortCriteria;
        const list = activeTab === "archives" ? archives : orders;
    
        return [...list].sort((a, b) => {
            let comp = 0;
            for (let c of criteria) {
                if (comp !== 0) break;
                if (c === "date") comp = new Date(a.orderDate) - new Date(b.orderDate);
                else if (c === "Payment Status") comp = a.paymentStatus.localeCompare(b.paymentStatus);
                else if (c === "Order Type") comp = a.orderType.localeCompare(b.orderType);
                else if (c === "Order Status") comp = a.orderStatus.localeCompare(b.orderStatus);
                else if (c === "description") comp = a.description.localeCompare(b.description);
                else if (c === "id") comp = a.id - b.id;
            }
            return comp;
        });
    }, [orders, archives, activeTab, orderSortCriteria, archiveSortCriteria]);
    
    const sortedDeliveries = useMemo(() => {
        return [...deliveries].sort((a, b) => {
            let comp = 0;
            for (let c of deliverySortCriteria) {
                if (comp !== 0) break;
                if (c === "date") comp = new Date(a.deliveryDate) - new Date(b.deliveryDate);
                else if (c === "status") comp = a.deliveryStatus.localeCompare(b.deliveryStatus);
                else if (c === "description") comp = a.description.localeCompare(b.description);
                else if (c === "id") comp = a.id - b.id;
            }
            return comp;
        });
    }, [deliveries, deliverySortCriteria]);
    
    const sortedReturns = useMemo(() => {
        return [...returns].sort((a, b) => {
            let comp = 0;
            for (let c of returnSortCriteria) {
                if (comp !== 0) break;
                if (c === "date") comp = new Date(a.dateRequested) - new Date(b.dateRequested);
                else if (c === "status") comp = a.status.localeCompare(b.status);
                else if (c === "description") comp = a.description.localeCompare(b.description);
                else if (c === "id") comp = a.id - b.id;
            }
            return comp;
        });
    }, [returns, returnSortCriteria]);

    const handleSortChange = (criterion, tab) => {
        const updateSort = (setFn, current) => {
            if (current.includes(criterion)) {
                setFn(current.filter(item => item !== criterion));
            } else {
                setFn([...current, criterion]);
            }
        };
    
        if (tab === "orders") updateSort(setOrderSortCriteria, orderSortCriteria);
        if (tab === "archives") updateSort(setArchiveSortCriteria, archiveSortCriteria);
        if (tab === "deliveries") updateSort(setDeliverySortCriteria, deliverySortCriteria);
        if (tab === "returns") updateSort(setReturnSortCriteria, returnSortCriteria);
    };  

    const openTrackModal = (order) => {
        setSelectedOrder(order);
        setIsTrackModalOpen(true);
    };

    const closeTrackModal = () => {
        setIsTrackModalOpen(false);
        setSelectedOrder(null);
    };
    
    const extractTableFromPDF = async (pdfUrl) => {
        try {
            const response = await fetch(pdfUrl);
            if (!response.ok) throw new Error(`Failed to load PDF: ${response.statusText}`);
            
            const arrayBuffer = await response.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise; 

            let textContent = "";
    
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const text = await page.getTextContent();

                let lastY = null;
                let pageText = "";
                
                text.items.forEach((item) => {
                    if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                        pageText += "\n"; // Add new line when Y position changes
                    }
                    pageText += item.str + " ";
                    lastY = item.transform[5];
                });
                textContent += pageText.trim() + "\n";
            }
    
            //alert(`Extracted Text: ${textContent}`);
            return parseExtractedData(textContent); // Pass extracted text to parser
        } catch (error) {
            alert(`Error extracting PDF: ${error}`);
            return [];
        }
    };

    const parseExtractedData = (textContent) => {
        const rows = textContent.split("\n").map((line) => line.trim()).filter(Boolean);
        
        //alert(`Parsed Rows: ${rows}`);
    
        // Example Pattern: ["#", "Generic Name", "Brand Name", "Category", "Price", "Quantity"]
        const extractedProducts = [];
        //alert(`PDF Name: ${rows.length}`)

        if (rows.length < 2) {
            alert("No valid product rows found in the invoice.");
            return [];
        }

        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(/\s+/);
    
            if (columns.length >= 9) {
                extractedProducts.push({
                    id: parseInt(columns[0]) || i,  // ID
                    generic: columns[1] || "N/A",   // Generic Name
                    brand: columns[2] || "N/A",     // Brand Name
                    category: columns[4] || "N/A",  // Category
                    price: columns[5] || "N/A",     // Price
                    expiry: columns[6] || "N/A",    // Expiry Date
                    lot: columns[7] || "N/A",       // Lot Number
                    quantity: parseInt(columns[8]) || 1 // Quantity
                });
            }
        }

        if (!extractedProducts.length) {
            alert("No products found in the invoice.");
            return;
        }

        return extractedProducts;
    };
        
    const openReturnModal = async (order) => {
        try {
            const pdfUrl = `/${order.invoice}`; // Adjust path based on storage location /invoices
            
            const extractedProducts = await extractTableFromPDF(pdfUrl);
            if (extractedProducts.length === 0) {
                alert("No products found in the invoice.");
                return;
            }
            setSelectedOrder({
                ...order,
                products: extractedProducts // ✅ Set extracted products in order
            });
    
            setIsReturnModalOpen(true);
        } catch (error) {
            console.error("Failed to extract PDF:", error);
            alert("Failed to read invoice PDF.");
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
    };

    const handleArchive = (order) => {
        setOrders(orders.filter(o => o.id !== order.id));
        setArchives([...archives, order]);
        setHistory([...history, { id: Date.now(), description: `User archived Order #${order.id}`, date: new Date().toLocaleString() }]);
    };

    const handleUnarchive = (order) => {
        setArchives(archives.filter(a => a.id !== order.id));
        setOrders([...orders, order]);
        setHistory([...history, { id: Date.now(), description: `User unarchived Order #${order.id}`, date: new Date().toLocaleString() }]);
    };

    const handleSelectReturnItem = (productId, isChecked) => {
        setSelectedReturnItems(prev => {
            if (isChecked) {
                return { ...prev, [productId]: { quantity: 1 } };
            } else {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            }
        });
    };
    
    const handleReturnQuantityChange = (productId, quantity) => {
        setSelectedReturnItems(prev => ({
            ...prev,
            [productId]: { quantity }
        }));
    };

    const generateReturnPDF = () => {
        if (Object.keys(selectedReturnItems).length === 0) {
            alert("No items selected for return!");
            return;
        }
        alert("Generating Return Receipt PDF...");
    
        const doc = new jsPDF();
        doc.text("Return Receipt", 14, 10);
    
        const productData = Object.keys(selectedReturnItems).map((productId, index) => {
            const product = selectedOrder.products.find(p => p.id === parseInt(productId));
            if (!product) return null;
            return [
                index + 1,
                product.generic || "N/A",
                product.brand || "N/A",
                product.category || "N/A",
                product.price || "N/A",
                selectedReturnItems[productId].quantity || 1
            ];
        }).filter(Boolean);

        if (!productData.length) {
            alert("No valid products found for return.");
            return;
        }

        const headers = [
            ["#", "Generic Name", "Brand Name", "Category", "Price (₱)", "Quantity"]
        ];
    
        autoTable(doc, {
            startY: 20,
            head: headers,
            body: productData,
        });
    
        const orderId = selectedOrder?.id || "Return";
        const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
        const fileName = `Return-${orderId}-${timestamp}.pdf`;
    
        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
    
        setPdfReturnData( {url: pdfUrl, name: fileName} );
        alert("PDF Created!");
    };

    const orderColumns = useMemo(() => [
        { accessorKey: "id", header: "Order ID", size: 80, cell: ({ row }) => <a href={`/${row.original.invoice}`} target="_blank" rel="noopener noreferrer">{row.original.id}</a> },
        { accessorKey: "description", header: "Description", size: 250 },
        { accessorKey: "orderDate", header: "Date Ordered", size: 150 },
        { accessorKey: "orderStatus", header: "Order Status", size: 150 },
        { accessorKey: "orderedBy", header: "Ordered By", size: 150 },
        { accessorKey: "invoice", header: "Sales Invoice", size: 150, cell: ({ row }) => <a href={`/${row.original.invoice}`} target="_blank" rel="noopener noreferrer">View Invoice</a> },
        { accessorKey: "total", header: "Total Amount", size: 100 },
        { accessorKey: "paymentStatus", header: "Payment Status", size: 150 },
        { accessorKey: "paymentDetails", header: "Payment Details", size: 150, cell: ({ row }) => <a href={`/${row.original.paymentDetails}`} target="_blank" rel="noopener noreferrer">View Payment</a> },
        { accessorKey: "orderType", header: "Order Type", size: 120 },
    ], []);

    const returnColumns = useMemo(() => [
        { accessorKey: "id", header: "Return ID", size: 80 },
        { accessorKey: "description", header: "Description", size: 250 },
        { accessorKey: "requestedBy", header: "Requested By", size: 150 }, // Updated from Ordered By
        { accessorKey: "dateRequested", header: "Date Requested", size: 150 }, // Updated from Date Ordered
        { accessorKey: "status", header: "Return Status", size: 150, cell: () => "Pending" },
        {
            accessorKey: "returnFile",
            header: "Return Receipt",
            size: 200,
            cell: ({ row }) => (
                <a href={`/${row.original.returnFile}`} target="_blank" rel="noopener noreferrer">
                    View Receipt
                </a>
            ),
        },
    ], []);

    const deliveryColumns = useMemo(() => [
        { accessorKey: "id", header: "No.", size: 80 },
        { accessorKey: "description", header: "Description", size: 250 },
        { accessorKey: "deliveryDate", header: "Delivery Date", size: 150},
        { accessorKey: "deliveryStatus", header: "Delivery Status", size: 150},
        { accessorKey: "receipt", header: "Delivery Receipt", size: 200, cell: ({ row }) => <a href={`/${row.original.receipt}`} target="_blank" rel="noopener noreferrer">View Receipt</a> },
        { accessorKey: "deliveredBy", header: "Delivered By", size: 150 },
        { accessorKey: "receivedBy", header: "Received By", size: 150 },
        { accessorKey: "action", header: "Action", size: 150, cell: ({ row }) => <button className="track-btn" onMouseEnter={(e) => showTooltip(e, "Track Delivery")} onMouseLeave={hideTooltip} onClick={() => {hideTooltip(); openTrackModal(row.original)}}> <Locate size={15} strokeWidth={3}/></button> }
    ], []);

    const orderTable = useReactTable({
        columns: orderColumns,
        data: activeTab === "orders" ? sortedOrders : activeTab === "returns" ? sortedReturns : history,
        getCoreRowModel: getCoreRowModel(),
    });

    const returnTable = useReactTable({
        columns: returnColumns,
        data: sortedReturns,
        getCoreRowModel: getCoreRowModel(),
    });

    const deliveryTable = useReactTable({
        columns: deliveryColumns,
        data: sortedDeliveries,
        getCoreRowModel: getCoreRowModel(),
    });

    const submitReturn = () => {
        if (!selectedOrder) {
            alert("No order selected for return.");
            return;
        }
    
        if (Object.keys(selectedReturnItems).length === 0) {
            alert("No items selected for return!");
            return;
        }

        const newReturn = {
            id: Date.now(), // Unique ID for the return
            description: selectedOrder.description, // Inherit description
            requestedBy: selectedOrder.orderedBy, // Change from orderedBy to requestedBy
            dateRequested: new Date().toLocaleString(), // Set date requested to current time
            returnFile: pdfReturnData.name, // Store return receipt file name
            status: "Pending",
        };
    
        setReturns([...returns, newReturn]);
        setHistory([...history, {
            id: Date.now(),
            description: `User submitted return for Order #${selectedOrder.id}`,
            date: new Date().toLocaleString()
        }]);
        
        const link = document.createElement("a");
        link.href = pdfReturnData.url;
        link.download = pdfReturnData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        alert("Return Submitted!");
        setIsReturnModalOpen(false);
        setPdfReturnData(null);
        setSelectedReturnItems({});
        setReturnReason("");
    };  

    const QuantityInput = ({
        productId,
        selectedReturnItems,
        handleReturnQuantityChange,
        maxQuantity, // ← the returnable quantity (e.g. product.quantity)
    }) => {
        const isSelected = selectedReturnItems[productId] !== undefined;
        const [localValue, setLocalValue] = useState(
            selectedReturnItems[productId]?.quantity?.toString() ?? ""
        );
    
        useEffect(() => {
            if (isSelected) {
                setLocalValue(selectedReturnItems[productId]?.quantity?.toString() ?? "");
            }
        }, [isSelected, selectedReturnItems, productId]);
    
        const handleBlur = () => {
            const parsed = parseInt(localValue);
            if (!isNaN(parsed) && parsed > 0 && parsed <= maxQuantity) {
                handleReturnQuantityChange(productId, parsed);
            } else {
                const safeValue = Math.min(Math.max(1, parsed || 1), maxQuantity);
                setLocalValue(safeValue.toString());
                handleReturnQuantityChange(productId, safeValue);
            }
        };
    
        return (
            <input
                type="number"
                min="1"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                disabled={!isSelected}
                className={`quantity-input ${!isSelected ? "disabled" : ""}`}
            />
        );
    };    
    
    QuantityInput.propTypes = {
        productId: PropTypes.number.isRequired,
        selectedReturnItems: PropTypes.object.isRequired,
        handleReturnQuantityChange: PropTypes.func.isRequired,
        maxQuantity: PropTypes.number.isRequired,
    };

    return (
        <div className="orders-page">
            {/* Render TrackPage as an Overlay */}
            {isTrackModalOpen && <TrackPage invoice={selectedOrder.invoice} orderId={selectedOrder.id} description={selectedOrder.description} onClose={closeTrackModal} />}
            <Navbar type="logged" />
            <motion.div  initial="initial" animate="animate" exit="exit" variants={pageVariants} className="content2">
                <div className="tabs2">
                    <button className={`tab-icon-q2 ${activeTab === "orders" ? "active" : ""}`} onClick={() => { hideTooltip(); setActiveTab("orders"); }}
                        onMouseEnter={(e) => activeTab !== "orders" && showTooltip(e, "Order List")}
                        onMouseLeave={hideTooltip}>
                        <img className="icown" src={OrderIcon} alt="Orders Icon" />
                    </button>
                    <button className={`tab-icon2 ${activeTab === "archives" ? "active" : ""}`} onClick={() => { hideTooltip(); setActiveTab("archives"); }}
                        onMouseEnter={(e) => activeTab !== "archives" && showTooltip(e, "Archives")}
                        onMouseLeave={hideTooltip}>
                        <Archive className="icown" size={20} />
                    </button>
                    <button className={`tab-icon2 ${activeTab === "deliveries" ? "active" : ""}`} onClick={() => { hideTooltip(); setActiveTab("deliveries") }}
                        onMouseEnter={(e) => activeTab !== "deliveries" && showTooltip(e, "Delivery History")}
                        onMouseLeave={hideTooltip}>
                        <Truck className="icown" size={20} />
                    </button>
                    <button className={`tab-icon2 ${activeTab === "history" ? "active" : ""}`} onClick={() => { hideTooltip(); setActiveTab("history"); }}
                        onMouseEnter={(e) => activeTab !== "history" && showTooltip(e, "History")}
                        onMouseLeave={hideTooltip}>
                        <History className="icown" size={20} />
                    </button>
                    <button className={`tab-icon2 ${activeTab === "returns" ? "active" : ""}`} onClick={() => { hideTooltip(); setActiveTab("returns") }}
                        onMouseEnter={(e) => showTooltip(e, "Return/Exchange")}
                        onMouseLeave={hideTooltip}>
                        <PackageX className="icown" size={20} />
                    </button>
                    <div className="tabs-22"><div className="divider2"></div>
                        <button className="tab-icon-add2" onClick={openModal}
                            onMouseEnter={(e) => { hideTooltip(); showTooltip(e, "Add Order"); }}
                            onMouseLeave={hideTooltip}>
                            <FilePlus className="icown" size={20} />
                        </button>
                    </div>
                </div>
                <div className="right-part">
                {tooltip.visible && (
                    <div className="tooltip2" style={{ left: `${tooltip.left}px`, top: `${tooltip.top}px` }}>
                        {tooltip.text}
                    </div>
                )}
                {activeTab !== "history" && (
                <div className="dropdown">
                    <button className="filter-btn">
                        SORT BY <Filter strokeWidth={3} size={15} />
                    </button>
                    <div className="dropdown-content">
                        {(activeTab === "orders" || activeTab === "archives") && 
                            ["date", "Payment Status", "Order Type", "Order Status", "description", "id"].map((criterion) => {
                                const currentSort = activeTab === "orders" ? orderSortCriteria : archiveSortCriteria;
                                return (
                                    <button
                                        key={criterion}
                                        onClick={() => handleSortChange(criterion, activeTab)}
                                        className={currentSort.includes(criterion) ? "active" : ""}
                                    >
                                        {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                                        {currentSort.includes(criterion) && <Check className="check" size={13} />}
                                    </button>
                                );
                            })
                        }

                        {activeTab === "deliveries" && 
                            ["date", "status", "description", "id"].map((criterion) => (
                                <button
                                    key={criterion}
                                    onClick={() => handleSortChange(criterion, "deliveries")}
                                    className={deliverySortCriteria.includes(criterion) ? "active" : ""}
                                >
                                    {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                                    {deliverySortCriteria.includes(criterion) && <Check className="check" size={13} />}
                                </button>
                            ))
                        }

                        {activeTab === "returns" &&
                            ["date", "status", "description", "id"].map((criterion) => (
                                <button
                                    key={criterion}
                                    onClick={() => handleSortChange(criterion, "returns")}
                                    className={returnSortCriteria.includes(criterion) ? "active" : ""}
                                >
                                    {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                                    {returnSortCriteria.includes(criterion) && <Check className="check" size={13} />}
                                </button>
                            ))
                        }
                    </div>
                </div>
                )}
                {(activeTab === "orders" || activeTab === "archives") && (
                        <div className="orders-table-wrapper">
                            <table className="orders-table">
                                <thead>
                                    {orderTable.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} style={{ width: header.getSize() }} onClick={() => handleSortChange(header.id)}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    <div
                                                        className="resizer2"
                                                        onMouseDown={header.getResizeHandler()}
                                                        style={{ cursor: "ew-resize" }}
                                                    />
                                                    <span>{header.isSorted ? (header.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                                                </th>
                                            ))}
                                            {activeTab !== "history" && <th>Action</th>}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {orderTable.getRowModel().rows.length === 0 ? (
                                        <tr>
                                            <td colSpan={orderColumns.length + 1} className="no-data-message">
                                                No {activeTab === "orders" ? "orders" :
                                                    activeTab === "archives" ? "archived files" :
                                                    "records"} available.
                                            </td>
                                        </tr>
                                    ) : (orderTable.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                            {activeTab === "orders" && (
                                                <td className="action-cell2">
                                                    <button className="archive-btn2" onClick={() => handleArchive(row.original)}
                                                        onMouseEnter={(e) => showTooltip(e, "Archive Order")}
                                                        onMouseLeave={hideTooltip}>
                                                        <FolderDown size={20} />
                                                    </button><div className="divider-2"></div>
                                                    <button className="track-btn" onClick={() => {hideTooltip(); openTrackModal(row.original)}}
                                                        onMouseEnter={(e) => showTooltip(e, "Track Order")}
                                                        onMouseLeave={hideTooltip}
                                                        disabled={row.original?.orderType !== "Delivery"}
                                                    >
                                                    <Locate size={15} strokeWidth={3}/>
                                                    </button><div className="divider-2"></div>
                                                    <button className="ret-btn" onClick={() => openReturnModal(row.original)}
                                                        onMouseEnter={(e) => showTooltip(e, "Return/Exchange")}
                                                        onMouseLeave={hideTooltip}>
                                                        <Undo className="icown" strokeWidth={3} size={15} />
                                                    </button>
                                                </td>
                                            )}
                                            {activeTab === "archives" && (
                                            <td>
                                                <button className="unarchive-btn2" onClick={() => {hideTooltip(); handleUnarchive(row.original)}}
                                                    onMouseEnter={(e) => showTooltip(e, "Unarchive File")}
                                                    onMouseLeave={hideTooltip}
                                                >
                                                    <FolderUp size={20} />
                                                </button>
                                            </td>
                                            )}
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                )}
                {activeTab === "deliveries" && (
                    <div className="delivery-table-wrapper">
                        <table className="delivery-table">
                            <thead>
                                {deliveryTable.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} style={{ width: header.getSize() }} onClick={() => handleSortChange(header.id)}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <div
                                                    className="resizer2"
                                                    onMouseDown={header.getResizeHandler()}
                                                    style={{ cursor: "ew-resize" }}
                                                />
                                                <span>{header.isSorted ? (header.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {deliveries.length === 0 ? (
                                    <tr><td colSpan={returnColumns.length + 1} className="no-data-message">
                                    No delivery history available.
                                    </td></tr>
                                ) : (deliveryTable.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "history" && (
                    <div className="con3">
                    <div className="dropdown2">
                    <button className="filter-btn2">
                        SORT BY <Filter strokeWidth={3} size={15} />
                    </button>
                    </div>
                    <div className="history-container2">
                        <table className="history-table2">
                            <thead>
                                <tr>
                                    <th>ACTIVITY HISTORY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length === 0 ? (
                                    <tr><td className="no-data-message">No history available.</td></tr>
                                ) : (
                                    history.map((entry) => (
                                        <tr key={entry.id}>
                                            <td>{entry.description} - <span className="timestamp">{entry.date}</span></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    </div>
                )}
                {activeTab === "returns" && (
                    <div className="returns-table-wrapper">
                        <table className="returns-table">
                            <thead>
                                {returnTable.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} onClick={() => handleSortChange(header.id)}>{flexRender(header.column.columnDef.header, header.getContext())}
                                                <span>{header.isSorted ? (header.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {returnTable.getRowModel().rows.length === 0 ? (
                                    <tr><td colSpan={returnColumns.length + 1} className="no-data-message">
                                        No return records available.
                                    </td></tr>
                                ) : (returnTable.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                        ))}
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                )}
                </div>
                <ChatHead/>
            </motion.div>
            
            {showSplash && <SplashScreen image={splashOrders} />}
            
            {isReturnModalOpen && (
                <div className="modal-overlay3">
                    <div className="modal-box3">
                        <h2>RETURN ORDER</h2>
                        <p>Processing return for Order <b>#{selectedOrder?.id}</b></p>

                        {/* Table for Selecting Items to Return */}
                        <div className="returns-table-wrapper2">
                            <table className="returns-table2">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Generic Name</th>
                                        <th>Brand Name</th>
                                        <th>Category</th>
                                        <th>Price (₱)</th>
                                        <th>Quantity Ordered</th>
                                        <th>Quantity to Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {selectedOrder?.products?.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <input type="checkbox"
                                                checked={!!selectedReturnItems[product.id]}
                                                onChange={(e) => handleSelectReturnItem(product.id, e.target.checked)}
                                            />
                                        </td>
                                        <td>{product.generic}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            {selectedReturnItems[product.id] && (
                                                <QuantityInput
                                                productId={product.id}
                                                selectedReturnItems={selectedReturnItems}
                                                handleReturnQuantityChange={handleReturnQuantityChange}
                                                maxQuantity={product.quantity}
                                        />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="label-butts">
                        {/* Reason Input Field */}
                        <div className="labeltext2">
                            <label>Reason for Return:</label>
                            <textarea value={returnReason} onChange={(e) => setReturnReason(e.target.value)} placeholder="Enter reason..."></textarea>
                        </div>

                        {/* Return Actions */}
                        <div className="modal-buttons3">
                            <button className="submit-btn-ord2" onClick={generateReturnPDF}>Generate PDF</button>
                            <button className="cancel-btn-ord2" onClick={() => setIsReturnModalOpen(false)}>Cancel</button>
                        </div>
                        </div>

                        {/* Display PDF Preview */}
                        {pdfReturnData && (
                            <div className="pdf-preview2">
                                <div className="pdframe">
                                <h2>RETURN SUMMARY</h2>
                                <iframe className="frame" src={pdfReturnData.url} width="100%" height="400px" title="Return PDF"></iframe>
                                <div className="modal-buttons4">
                                    <button className="submit-btn-ord3" onClick={submitReturn}>Submit Return</button>
                                    <button className="edit-btn-ord3" onClick={() => setPdfReturnData(null)}>Edit Return</button>
                                    <button className="cancel-btn-ord3" onClick={() => setIsReturnModalOpen(false)}>Cancel</button>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isModalOpen && (
            <div className="modal-overlay2">
                <div className="modal-box2">
                    <h2><b><center>Add New Order</center></b></h2>

                    <div className="modal-buttons2">
                        <button className="convert-button" onClick={() => {
                            closeModal();
                            navigate("/quotations"); // Redirect to Quotations Page
                        }}>
                            <MessageSquareQuote color="white" size={24} /> Convert from Quotation
                        </button> <p style={{ alignSelf: "center", fontWeight: "bolder"}}>or </p>
                        <button className="new-order-btn" onClick={() => {
                            closeModal();
                            navigate("/products", { state: { startOrdering: true } });
                        }}>
                            <PackageSearch color="black" size={24} /> Place New Order
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Orders;
