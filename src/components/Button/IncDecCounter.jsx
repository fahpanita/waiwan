import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductId } from "../../services/product";
function IncDecCounter() {
    let [amount, setNum] = useState(1);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [product, setProduct] = useState([]);

    const [createBuyProductForm] = Form.useForm();
    const formDataBuyProduct = Form.useWatch([], createBuyProductForm);

    const handleGetProduct = async (id) => {
        const res = await getProductId(id);
        setProduct(res?.data);
    };

    let incNum = () => {
        if (amount < product?.stock) {
            setNum(Number(amount) + 1);
        }
    };
    let decNum = () => {
        if (amount > 1) {
            setNum(amount - 1);
        }
    }
    let handleChange = (e) => {
        setNum(e.target.value);
    }

    useEffect(() => {
        if (id) {
            handleGetProduct(id);
        }
    }, [id]);

    return (
        <>
            <div className="col-xl-1">
                <div class="input-group" style={{ display: "flex", flexWrap: "nowrap" }}>
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-primary" type="button" onClick={decNum}>-</button>
                    </div>
                    <input type="text" class="form-control" name="amount" value={amount} onChange={handleChange} style={{ width: "60px", minWidth: "auto" }} />
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-primary" type="button" onClick={incNum}>+</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default IncDecCounter;

