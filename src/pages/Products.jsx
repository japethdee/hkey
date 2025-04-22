import { useState, useMemo, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Navbar";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "../styles/products.css";
import { FilePlus, Filter, ArrowUpRight, X, Pencil, Send, Check } from "lucide-react";
import ChatHead from "../components/ChatHead";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import splashProds from "../assets/prod-page.png";

const Products = () => {
    const [showSplash, setShowSplash] = useState(true);

        useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1000);
        return () => clearTimeout(timer);
        }, []);
    const location = useLocation();
    const [orderedBy, setOrderedBy] = useState("");
    const pageVariants = {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
    };

    /*
        The return button will open a modal with a table in it. the table is a converted pdf of the delivery receipt which contains the order list (check box column, quantity to return, generic name, brand name, product type, quantity ordered, price) below the table would be a text field for reason, buttons for return or cancel, and every submission of returns will be recorded in return/exchange tab.
    */
    const [products] = useState([
        { id: 1, generic: "Paracetamol", brand: "Biogesic", packaging: "Tablet", category: "Caps/Tabs", price: 50, expiry: "2026-08-10", lot: "A123" },
        { id: 2, generic: "Ibuprofen", brand: "Advil", packaging: "Capsule", category: "Caps/Tabs", price: 120, expiry: "2025-12-15", lot: "B456" },
        { id: 3, generic: "Amoxicillin", brand: "Amoxil", packaging: "Syrup", category: "Susp/Syr", price: 300, expiry: "2027-03-20", lot: "C789" },
        { id: 4, generic: "Hydrocortisone", brand: "Cortef", packaging: "Cream", category: "Ointment/Cream", price: 450, expiry: "2025-09-25", lot: "D321" },
        { id: 5, generic: "Insulin", brand: "Lantus", packaging: "Vial", category: "Vial/Ampoule", price: 2000, expiry: "2028-01-12", lot: "E654" },
        { id: 6, generic: "Ibuprofen", brand: "Advil", packaging: "Capsule", category: "Caps/Tabs", price: 120, expiry: "2025-12-15", lot: "B456" },
        { id: 7, generic: "Amoxicillin", brand: "Amoxil", packaging: "Syrup", category: "Susp/Syr", price: 300, expiry: "2027-03-20", lot: "C789" },
        { id: 8, generic: "Hydrocortisone", brand: "Cortef", packaging: "Cream", category: "Ointment/Cream", price: 450, expiry: "2025-09-25", lot: "D321" },
        { id: 9, generic: "Insulin", brand: "Lantus", packaging: "Vial", category: "Vial/Ampoule", price: 2000, expiry: "2028-01-12", lot: "E654" },
        { id: 10, generic: "Ibuprofen", brand: "Advil", packaging: "Capsule", category: "Caps/Tabs", price: 120, expiry: "2025-12-15", lot: "B456" },
        { id: 11, generic: "Amoxicillin", brand: "Amoxil", packaging: "Syrup", category: "Susp/Syr", price: 300, expiry: "2027-03-20", lot: "C789" },
        { id: 12, generic: "Hydrocortisone", brand: "Cortef", packaging: "Cream", category: "Ointment/Cream", price: 450, expiry: "2025-09-25", lot: "D321" },
        { id: 13, generic: "Insulin", brand: "Lantus", packaging: "Vial", category: "Vial/Ampoule", price: 2000, expiry: "2028-01-12", lot: "E654" },
        { id: 14, generic: "Ibuprofen", brand: "Advil", packaging: "Capsule", category: "Caps/Tabs", price: 120, expiry: "2025-12-15", lot: "B456" },
        { id: 15, generic: "Amoxicillin", brand: "Amoxil", packaging: "Syrup", category: "Susp/Syr", price: 300, expiry: "2027-03-20", lot: "C789" },
        { id: 16, generic: "Hydrocortisone", brand: "Cortef", packaging: "Cream", category: "Ointment/Cream", price: 450, expiry: "2025-09-25", lot: "D321" },
        { id: 17, generic: "Insulin", brand: "Lantus", packaging: "Vial", category: "Vial/Ampoule", price: 2000, expiry: "2028-01-12", lot: "E654" },
        { id: 18, generic: "Thermometer", brand: "Omron", packaging: "Box", category: "Medical Devices", price: 800, expiry: "N/A", lot: "F987" }
    ]);

    const [search, setSearch] = useState("");
    const [isOrdering, setIsOrdering] = useState(location.state?.startOrdering || false);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [pdfData, setPdfData] = useState(null);
    const [sortCriteria, setSortCriteria] = useState(["brand"]);

    const toggleOrderMode = () => {
        setIsOrdering(!isOrdering);
        if (!isOrdering) setSelectedProducts({});
    };

    const handleSelectProduct = (productId, isChecked) => {
        setSelectedProducts(prev => {
            if (isChecked) {
                return { ...prev, [productId]: { quantity: 1 } };
            } else {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            }
        });
    };
    

    const handleQuantityChange = (productId, quantity) => {
        setSelectedProducts(prev => ({
            ...prev,
            [productId]: { quantity }
        }));
    };

    const generatePDF = () => {
        if (Object.keys(selectedProducts).length === 0) {
            alert("Please fill in all fields before submitting!");
            return;
        }
        alert("Creating PDF...");

        const doc = new jsPDF();
        doc.text(`Order Summary\nOrdered By: ${orderedBy}`, 14, 10);

        const productData = Object.keys(selectedProducts).map((productId, index) => {
            const product = products.find(p => p.id === parseInt(productId));
            return [
                index + 1, 
                product.generic || "N/A",
                product.brand || "N/A",
                product.packaging || "N/A",
                product.category || "N/A",
                product.price || "N/A",
                product.expiry || "N/A",
                product.lot || "N/A",
                selectedProducts[productId].quantity || 1
            ];
        });
    
        const headers = [
            ["#", "Generic Name", "Brand Name", "Packaging", "Category", "Price (₱)", "Expiry Date", "Lot Number", "Quantity"]
        ];
    
        autoTable(doc, {
            startY: 20,
            head: headers,
            body: productData,
        });
        
        const orderId = Object.keys(selectedProducts)[0] || "Order"; // Use first selected product ID as order ID
        const timestamp = new Date().toISOString().replace(/[:.-]/g, ""); // Remove special characters
        const fileName = `Order-${orderId}-${timestamp}.pdf`;

        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfData({ url: pdfUrl, name: fileName });

        alert("PDF Created!");
    };

    const sendOrder = () => {
        if (!orderedBy || !description) {
            alert("Please fill in all fields before submitting!");
            return;
        }
        const link = document.createElement("a");
        link.href = pdfData.url;
        link.download = pdfData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert("Order Sent");
        setPdfData(null);
        setSelectedProducts({});
        setIsOrdering(false);
        setDescription(null);
        setOrderedBy(null);
    };

    const editOrder = () => {
        setPdfData(null);
        setIsOrdering(true);
    };

    const cancelOrder = () => {
        setPdfData(null);
        setSelectedProducts({});
        setIsOrdering(false);
        alert("Order Cancelled");
    };

    // ✅ Optimized Sorting & Filtering with useMemo (Avoids Re-rendering)
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            let comparison = 0;
            for (let criterion of sortCriteria) {
                if (comparison === 0) {
                    if (criterion === "brand") {
                        comparison = a.brand.localeCompare(b.brand);
                    } else if (criterion === "generic") {
                        comparison = a.generic.localeCompare(b.generic);
                    } else if (criterion === "category") {
                        comparison = a.category.localeCompare(b.category);
                    }
                }
            }
            return comparison;
        });
    }, [sortCriteria, products]);

    const handleSortChange = (criterion) => {
        setSortCriteria((prev) => {
            if (prev.includes(criterion)) {
                return prev.filter((item) => item !== criterion); // Remove if already in the list
            }
            return [...prev, criterion]; // Add new sort criterion
        });
    };

    const columns = useMemo(() => [
        ...(isOrdering ? [{ accessorKey: "select", header: "", cell: ({ row }) => (
            <input type="checkbox"
                checked={!!selectedProducts[row.original.id]}
                onChange={(e) => handleSelectProduct(row.original.id, e.target.checked)}
                className="checkbox-input"
            />
        ) }] : []),
        { accessorKey: "generic", header: "Generic Name" },
        { accessorKey: "brand", header: "Brand Name" },
        { accessorKey: "packaging", header: "Packaging" },
        { accessorKey: "category", header: "Product Category" },
        { accessorKey: "price", header: "Price (₱)" },
        { accessorKey: "expiry", header: "Expiry Date" },
        { accessorKey: "lot", header: "Lot Number" },
        ...(isOrdering ? [{ accessorKey: "quantity", header: "Quantity", size: 50, cell: ({ row }) => {
            const productId = row.original.id;
            const isSelected = selectedProducts[productId] !== undefined;
        
            const [localValue, setLocalValue] = useState(
                selectedProducts[productId]?.quantity ?? ""
            );
        
            useEffect(() => {
                // Sync local value with external state when selection changes
                if (isSelected) {
                    setLocalValue(selectedProducts[productId]?.quantity ?? "");
                }
            }, [isSelected, selectedProducts, productId]);
        
            return (
                <input
                    type="number"
                    min="1"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={() => {
                        const parsed = parseInt(localValue);
                        if (!isNaN(parsed) && parsed > 0) {
                            handleQuantityChange(productId, parsed);
                        } else {
                            setLocalValue("1");
                            handleQuantityChange(productId, 1);
                        }
                    }}
                    disabled={!isSelected}
                    className={`quantity-input ${!isSelected ? "disabled" : ""}`}
                />
            );
        }}
        ] : [])
    ], [isOrdering, selectedProducts]);

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
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const [description, setDescription] = useState("");

    const hideTooltip = () => setTooltip({ visible: false, left: 0, top: 0, text: "" });

    const table = useReactTable({
        columns,
        data: sortedProducts,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="products-page">
            <Navbar type="logged" activeTab="products" />
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="products-container">
            <h1 className="table-title">PRODUCTS LIST</h1>
                <div className="products-header">
                    {tooltip.visible && (
                    <div className="tooltip3" style={{ left: `${tooltip.left}px`, top: `${tooltip.top}px` }}>
                        {tooltip.text}
                    </div>
                    )}
                    <button className="add-order-button" onClick={toggleOrderMode}
                        onMouseEnter={(e) => { hideTooltip(); showTooltip(e, "Add Order"); }}
                        onMouseLeave={hideTooltip}>
                        <FilePlus className= "iconz" strokeWidth={2} size={21} />
                    </button>
                    <input className="input2" type="text" placeholder="SEARCH PRODUCTS..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <div className="dropdown">
                        <button className="filter-btn">
                            SORT BY <Filter strokeWidth={3} size={15} />
                        </button>
                        <div className="dropdown-content">
                            <button onClick={() => handleSortChange("brand")} className={sortCriteria.includes("brand") ? "active" : ""}>Brand Name {sortCriteria.includes("brand") && <Check className= "check" size={13}/>}</button>
                            <button onClick={() => handleSortChange("generic")} className={sortCriteria.includes("generic") ? "active" : ""}>Generic Name {sortCriteria.includes("generic") && <Check className= "check" size={13}/>}</button>
                            <button onClick={() => handleSortChange("category")} className={sortCriteria.includes("category") ? "active" : ""}>Product Category {sortCriteria.includes("category") && <Check className= "check" size={13}/>}</button>
                        </div>
                    </div>
                </div>
                {pdfData && (
                    <div className="modal-overlay-ord">
                        <div className="modal-box-ord">
                            <h2>ORDER SUMMARY</h2>
                            <div className="labeltext"><label>Description:</label>
                            <input
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter description"
                            ></input>
                            <label>Ordered By:</label>
                                <input
                                    type="text"
                                    value={orderedBy}
                                    onChange={(e) => setOrderedBy(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>
                            
                            {/* Show the PDF Preview */}
                            <iframe src={pdfData.url} width="100%" height="400px" title={pdfData.name}></iframe>

                            <div className="modal-buttons-ord">
                                <button className="submit-btn-ord" onClick={sendOrder}>
                                <Send strokeWidth={3} size={18} />Send Order</button>
                                <button className="edit-btn-ord" onClick={editOrder}><Pencil strokeWidth={3} size={18} />Edit Order</button>
                                <button className="cancel-btn-ord" onClick={cancelOrder}><X strokeWidth={3} size={18} />Cancel Order</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="products-table-wrapper">
                    <table className="products-table">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr><td colSpan={columns.length} className="no-data-message">No products available.</td></tr>
                            ) : (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {isOrdering && (
                    <div className="order-buttons">
                        <button className="generate-order-btn" onClick={generatePDF}><ArrowUpRight strokeWidth={3} size={18} /> GENERATE ORDER</button>
                        <button className="cancel-order-btn" onClick={toggleOrderMode}><X strokeWidth={3} size={18} /> CANCEL</button>
                    </div>
                )}
            <ChatHead />
            </motion.div>
            {showSplash && <SplashScreen image={splashProds} />}
        </div>
    );
};

export default Products;